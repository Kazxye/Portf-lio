export type RGB = [number, number, number];

export function parseHexColor(hex: string): RGB {
  const match = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!match) throw new Error(`Invalid hex color: ${hex}`);
  const n = parseInt(match[1], 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

export type CoverTransform = { scaleX: number; scaleY: number; offsetX: number; offsetY: number };

/**
 * Same math as CSS object-fit: cover + object-position. The shader and the fallback <img>
 * use it so they line up exactly; the lens readout uses it to map back to photo pixels.
 */
export function coverTransform(
  boxWidth: number,
  boxHeight: number,
  imageWidth: number,
  imageHeight: number,
  position: { x: number; y: number },
): CoverTransform {
  const boxRatio = boxWidth / boxHeight;
  const imageRatio = imageWidth / imageHeight;
  let scaleX = 1;
  let scaleY = 1;
  if (boxRatio > imageRatio) scaleY = imageRatio / boxRatio;
  else scaleX = boxRatio / imageRatio;
  return { scaleX, scaleY, offsetX: (1 - scaleX) * position.x, offsetY: (1 - scaleY) * position.y };
}

const VERTEX_SHADER = /* glsl */ `
  attribute vec2 aPosition;
  void main() {
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  #ifdef GL_FRAGMENT_PRECISION_HIGH
  precision highp float;
  #else
  precision mediump float;
  #endif

  uniform sampler2D uTexture;
  uniform vec2 uResolution;      // canvas size, device px
  uniform vec2 uUvScale;         // object-fit: cover mapping, screen uv -> image uv
  uniform vec2 uUvOffset;
  uniform float uCell;           // device px per dither dot
  uniform vec2 uMouse;           // device px, top-left origin
  uniform float uLensRadius;     // device px, 0 = closed
  uniform float uIrisRadius;     // device px, from the centre: "view original" reveal
  uniform float uLightRadius;    // device px
  uniform float uHover;          // 0..1 eased pointer presence, drives the light
  uniform float uReveal;         // 0..1 print-in progress
  uniform float uDitherStrength; // 0 = hard threshold, 1 = full ordered dither
  uniform float uGamma;          // tone curve, see DITHER_TONES
  uniform float uLift;
  uniform float uDpr;
  uniform vec3 uForeground;
  uniform vec3 uBackground;

  // Recursive Bayer matrix: 2x2 -> 4x4 -> 8x8, no lookup table or bit ops (GLSL ES 1.0).
  float bayer2(vec2 a) { a = floor(a); return fract(a.x * 0.5 + a.y * a.y * 0.75); }
  float bayer4(vec2 a) { return bayer2(0.5 * a) * 0.25 + bayer2(a); }
  float bayer8(vec2 a) { return bayer4(0.5 * a) * 0.25 + bayer2(a); }

  vec3 sampleImage(vec2 px) {
    vec2 uv = uUvOffset + (px / uResolution) * uUvScale;
    return texture2D(uTexture, uv).rgb;
  }

  void main() {
    vec2 px = vec2(gl_FragCoord.x, uResolution.y - gl_FragCoord.y);
    vec2 cell = floor(px / uCell);

    // Sample once per dot at its centre, so each dot is a clean on/off decision.
    vec3 source = sampleImage((cell + 0.5) * uCell);
    float lum = dot(source, vec3(0.2126, 0.7152, 0.0722));
    lum = clamp(pow(lum, uGamma) + uLift, 0.0, 1.0);

    // The lens doubles as a faint light: small exposure lift plus local contrast.
    float d = distance(px, uMouse);
    float light = uHover * exp(-(d * d) / (uLightRadius * uLightRadius));
    lum = clamp(lum + light * 0.045, 0.0, 1.0);
    lum = mix(lum, clamp((lum - 0.5) * 1.2 + 0.5, 0.0, 1.0), light * 0.4);

    float rank = bayer8(cell);
    float threshold = 0.5 + (rank + 0.0078125 - 0.5) * uDitherStrength;
    float bit = step(threshold, lum);

    // Print-in: dots appear in Bayer order. Unprinted dots are transparent, so the
    // photo underneath (the <img> fallback) turns into 1-bit instead of popping from black.
    float printed = 1.0 - step(uReveal, rank);
    vec3 color = mix(uBackground, uForeground, bit);
    float alpha = printed;

    float feather = 1.5 * uDpr;
    float original = 0.0;
    float iris = 0.0;
    if (uIrisRadius > 0.5) {
      float di = distance(px, uResolution * 0.5);
      iris = 1.0 - smoothstep(uIrisRadius - feather, uIrisRadius, di);
      original = iris;
    }
    float ring = 0.0;
    if (uLensRadius > 0.5) {
      float lens = 1.0 - smoothstep(uLensRadius - feather, uLensRadius, d);
      original = max(original, lens);
      ring = smoothstep(uLensRadius - feather, uLensRadius, d)
           * (1.0 - smoothstep(uLensRadius + uDpr, uLensRadius + uDpr + feather, d))
           * (1.0 - iris);
    }
    if (original > 0.0) color = mix(color, sampleImage(px), original);
    color = mix(color, uForeground, ring * 0.85);
    alpha = max(alpha, max(original, ring));

    // Premultiplied output: the context is created with premultipliedAlpha.
    gl_FragColor = vec4(color * alpha, alpha);
  }
`;

const UNIFORM_NAMES = [
  "uTexture", "uResolution", "uUvScale", "uUvOffset", "uCell", "uMouse", "uLensRadius", "uIrisRadius",
  "uLightRadius", "uHover", "uReveal", "uDitherStrength", "uGamma", "uLift", "uDpr", "uForeground", "uBackground",
] as const;
type UniformName = (typeof UNIFORM_NAMES)[number];

/**
 * Tone curves per kind of image.
 * photo: gamma lift keeps structure in dark clothing without washing out a face.
 * interface: screenshots are mostly near-white panels; a steep curve leaves pure white
 * empty and turns light greys (borders, secondary text) into visible dots.
 */
export const DITHER_TONES = {
  photo: { gamma: 0.8, lift: -0.03 },
  interface: { gamma: 2.0, lift: 0 },
} as const;
export type DitherTone = keyof typeof DITHER_TONES;

export type DitherOptions = {
  foreground: RGB;
  background: RGB;
  ditherStrength: number;
  tone: DitherTone;
};

// All positions and sizes in CSS px, relative to the canvas.
export type DitherFrame = {
  x: number;
  y: number;
  lensRadius: number;
  /** "View original" reveal radius from the centre, CSS px. */
  irisRadius: number;
  hover: number;
  reveal: number;
};

export type DitherLayout = {
  width: number;
  height: number;
  dpr: number;
  pixelSize: number;
  objectPosition: { x: number; y: number };
};

export class DitherRenderer {
  private readonly gl: WebGLRenderingContext;
  private readonly program: WebGLProgram;
  private readonly buffer: WebGLBuffer;
  private readonly texture: WebGLTexture;
  private readonly uniforms: Record<UniformName, WebGLUniformLocation | null>;
  private readonly shaders: WebGLShader[] = [];
  private dpr = 1;
  private imageSize = { width: 1, height: 1 };
  private hasImage = false;
  /**
   * True when WebGL runs on the CPU (SwiftShader, llvmpipe, blocklisted GPUs, VMs,
   * headless audit browsers). Every frame then costs main-thread time, so callers
   * should draw as few frames as possible.
   */
  readonly isSoftware: boolean;

  constructor(private readonly canvas: HTMLCanvasElement, options: DitherOptions) {
    const gl = canvas.getContext("webgl", {
      // Transparent where nothing is printed yet, so the <img> below shows through.
      alpha: true,
      antialias: false,
      premultipliedAlpha: true,
      preserveDrawingBuffer: false,
      powerPreference: "low-power",
    });
    if (!gl) throw new Error("webgl-unavailable");
    this.gl = gl;

    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
    const rendererName = String(
      gl.getParameter(debugInfo ? debugInfo.UNMASKED_RENDERER_WEBGL : gl.RENDERER) ?? "",
    );
    this.isSoftware = /swiftshader|llvmpipe|softpipe|software|basic render/i.test(rendererName);

    const program = gl.createProgram();
    if (!program) throw new Error("program-create-failed");
    this.program = program;
    gl.attachShader(program, this.compile(gl.VERTEX_SHADER, VERTEX_SHADER));
    gl.attachShader(program, this.compile(gl.FRAGMENT_SHADER, FRAGMENT_SHADER));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(`program-link-failed: ${gl.getProgramInfoLog(program) ?? "unknown"}`);
    }
    gl.useProgram(program);

    // One oversized triangle covers the viewport with fewer vertices than a quad.
    const buffer = gl.createBuffer();
    if (!buffer) throw new Error("buffer-create-failed");
    this.buffer = buffer;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const texture = gl.createTexture();
    if (!texture) throw new Error("texture-create-failed");
    this.texture = texture;
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    // NPOT textures in WebGL 1 require clamp and no mipmaps.
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    this.uniforms = Object.fromEntries(
      UNIFORM_NAMES.map((name) => [name, gl.getUniformLocation(program, name)]),
    ) as Record<UniformName, WebGLUniformLocation | null>;

    gl.uniform1i(this.uniforms.uTexture, 0);
    gl.uniform3fv(this.uniforms.uForeground, options.foreground);
    gl.uniform3fv(this.uniforms.uBackground, options.background);
    gl.uniform1f(this.uniforms.uDitherStrength, options.ditherStrength);
    gl.uniform1f(this.uniforms.uGamma, DITHER_TONES[options.tone].gamma);
    gl.uniform1f(this.uniforms.uLift, DITHER_TONES[options.tone].lift);
  }

  setImage(image: HTMLImageElement) {
    const { gl } = this;
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
    this.imageSize = { width: image.naturalWidth, height: image.naturalHeight };
    this.hasImage = true;
  }

  resize({ width, height, dpr, pixelSize, objectPosition }: DitherLayout) {
    const { gl, uniforms } = this;
    this.dpr = dpr;
    this.canvas.width = Math.max(1, Math.round(width * dpr));
    this.canvas.height = Math.max(1, Math.round(height * dpr));
    gl.viewport(0, 0, this.canvas.width, this.canvas.height);

    const cover = coverTransform(width, height, this.imageSize.width, this.imageSize.height, objectPosition);
    gl.uniform2f(uniforms.uUvScale, cover.scaleX, cover.scaleY);
    gl.uniform2f(uniforms.uUvOffset, cover.offsetX, cover.offsetY);

    gl.uniform2f(uniforms.uResolution, this.canvas.width, this.canvas.height);
    // Whole device pixels per dot keep the pattern crisp on Retina screens.
    gl.uniform1f(uniforms.uCell, Math.max(1, Math.round(pixelSize * dpr)));
    gl.uniform1f(uniforms.uDpr, dpr);
    gl.uniform1f(uniforms.uLightRadius, 220 * dpr);
  }

  render(frame: DitherFrame) {
    if (!this.hasImage) return;
    const { gl, uniforms, dpr } = this;
    gl.uniform2f(uniforms.uMouse, frame.x * dpr, frame.y * dpr);
    gl.uniform1f(uniforms.uLensRadius, frame.lensRadius * dpr);
    gl.uniform1f(uniforms.uIrisRadius, frame.irisRadius * dpr);
    gl.uniform1f(uniforms.uHover, frame.hover);
    gl.uniform1f(uniforms.uReveal, frame.reveal);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  dispose() {
    const { gl } = this;
    // Resources are deleted explicitly. The context itself is not force-lost, because a
    // lost context cannot be recreated on the same canvas (React Strict Mode remounts).
    gl.deleteTexture(this.texture);
    gl.deleteBuffer(this.buffer);
    this.shaders.forEach((shader) => gl.deleteShader(shader));
    gl.deleteProgram(this.program);
  }

  private compile(type: number, source: string): WebGLShader {
    const { gl } = this;
    const shader = gl.createShader(type);
    if (!shader) throw new Error("shader-create-failed");
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const info = gl.getShaderInfoLog(shader) ?? "unknown";
      gl.deleteShader(shader);
      throw new Error(`shader-compile-failed: ${info}`);
    }
    this.shaders.push(shader);
    return shader;
  }
}
