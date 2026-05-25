import { useCallback, useEffect, useRef, useState } from "react";
import { useKonami } from "../../hooks/useKonami";
import { useAchievements } from "../../context/AchievementContext";

const DURATION_MS = 8000;
const FADE_MS = 500;
const FONT_SIZE = 15;
const DRAW_INTERVAL = 50;

type Phase = "off" | "on" | "fading";

export function KonamiMatrix() {
    const { unlock } = useAchievements();
    const [phase, setPhase] = useState<Phase>("off");
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const trigger = useCallback(() => {
        unlock("konami");
        setPhase("on");
    }, [unlock]);

    useKonami(trigger);

    /* Schedule fade → off */
    useEffect(() => {
        if (phase !== "on") return;
        const t1 = window.setTimeout(() => setPhase("fading"), DURATION_MS - FADE_MS);
        return () => window.clearTimeout(t1);
    }, [phase]);
    useEffect(() => {
        if (phase !== "fading") return;
        const t = window.setTimeout(() => setPhase("off"), FADE_MS);
        return () => window.clearTimeout(t);
    }, [phase]);

    /* Canvas animation */
    useEffect(() => {
        if (phase === "off") return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;
        const resize = () => {
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = window.innerWidth + "px";
            canvas.style.height = window.innerHeight + "px";
            ctx.scale(dpr, dpr);
        };
        resize();
        window.addEventListener("resize", resize);

        const cols = Math.floor(window.innerWidth / FONT_SIZE);
        const drops: number[] = Array(cols).fill(0).map(() => Math.random() * -50);
        const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホKAZYSセキュリティdefensive";

        let intervalId: number | undefined;

        const draw = () => {
            ctx.fillStyle = "rgba(5, 5, 5, 0.08)";
            ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
            ctx.font = `${FONT_SIZE}px "JetBrains Mono", monospace`;
            for (let i = 0; i < drops.length; i++) {
                const ch = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillStyle = i % 7 === 0 ? "#a78bfa" : "#8b5cf6";
                ctx.fillText(ch, i * FONT_SIZE, drops[i] * FONT_SIZE);
                if (drops[i] * FONT_SIZE > window.innerHeight && Math.random() > 0.965) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        intervalId = window.setInterval(draw, DRAW_INTERVAL);

        return () => {
            if (intervalId !== undefined) window.clearInterval(intervalId);
            window.removeEventListener("resize", resize);
        };
    }, [phase]);

    if (phase === "off") return null;

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            style={{
                position: "fixed",
                inset: 0,
                pointerEvents: "none",
                zIndex: 9998,
                opacity: phase === "fading" ? 0 : 1,
                transition: `opacity ${FADE_MS}ms ease-out`,
                background: "transparent",
            }}
        />
    );
}
