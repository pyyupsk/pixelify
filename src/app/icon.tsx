import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#121212",
      }}
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Pixelify</title>
        {/* Main body */}
        <rect x="4" y="10" width="24" height="12" fill="#f8f8f8" />
        <rect x="2" y="12" width="2" height="8" fill="#f8f8f8" />
        <rect x="28" y="12" width="2" height="8" fill="#f8f8f8" />

        {/* D-Pad (Left side) */}
        <rect x="8" y="14" width="2" height="6" fill="#121212" />
        <rect x="6" y="16" width="6" height="2" fill="#121212" />

        {/* Buttons (Right side) - arranged like SNES */}
        <rect x="22" y="14" width="2" height="2" fill="#121212" />
        <rect x="20" y="16" width="2" height="2" fill="#121212" />
        <rect x="24" y="16" width="2" height="2" fill="#121212" />
        <rect x="22" y="18" width="2" height="2" fill="#121212" />

        {/* Center buttons/screen */}
        <rect x="14" y="15" width="2" height="2" fill="#121212" />
        <rect x="16" y="15" width="2" height="2" fill="#121212" />

        {/* Shoulder buttons indicators (top corners) */}
        <rect x="6" y="10" width="4" height="2" fill="#121212" />
        <rect x="22" y="10" width="4" height="2" fill="#121212" />

        {/* Grip details (bottom sides) */}
        <rect x="4" y="22" width="3" height="2" fill="#121212" />
        <rect x="25" y="22" width="3" height="2" fill="#121212" />
      </svg>
    </div>,
    {
      ...size,
    },
  );
}
