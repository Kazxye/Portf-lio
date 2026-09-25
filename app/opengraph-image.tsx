import { ImageResponse } from 'next/og'

export const alt = 'Kazys Tatarunas — Security-minded software engineer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: '#08090a',
        color: '#ecedef',
        padding: '64px 72px',
        fontFamily: 'sans-serif',
        border: '1px solid #24282d',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          color: '#8a9098',
          fontSize: 18,
          letterSpacing: 3,
        }}
      >
        <span>SECURITY / SOFTWARE ENGINEERING</span>
        <span style={{ color: '#67e8f9' }}>K/</span>
      </div>
      <div
        style={{
          display: 'flex',
          marginTop: 100,
          fontSize: 90,
          letterSpacing: -5,
          fontWeight: 600,
        }}
      >
        Kazys Tatarunas<span style={{ color: '#67e8f9' }}>.</span>
      </div>
      <div
        style={{
          display: 'flex',
          marginTop: 24,
          fontSize: 32,
          color: '#a6acb4',
        }}
      >
        Security-minded software engineer.
      </div>
      <div
        style={{
          display: 'flex',
          marginTop: 'auto',
          borderTop: '1px solid #24282d',
          paddingTop: 24,
          justifyContent: 'space-between',
          fontSize: 18,
          color: '#8a9098',
        }}
      >
        <span>Secure systems / Backend / Security tooling</span>
        <span>kazys.dev</span>
      </div>
    </div>,
    size,
  )
}
