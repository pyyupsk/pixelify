import "./logo.css";

type Props = {
  size?: number;
  animated?: boolean;
  className?: string;
};

export function Logo({
  size = 32,
  animated = true,
  className = "",
}: Readonly<Props>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`gamepad-logo ${animated ? "animated" : ""} ${className}`}
    >
      <title>Gamepad</title>
      {/* Main body */}
      <rect x="4" y="10" width="24" height="12" className="gamepad-body" />
      <rect x="2" y="12" width="2" height="8" className="gamepad-body" />
      <rect x="28" y="12" width="2" height="8" className="gamepad-body" />

      {/* D-Pad (Left side) */}
      <rect
        x="8"
        y="14"
        width="2"
        height="6"
        className="gamepad-dpad dpad-vertical"
      />
      <rect
        x="6"
        y="16"
        width="6"
        height="2"
        className="gamepad-dpad dpad-horizontal"
      />

      {/* Buttons (Right side) - arranged like SNES */}
      <rect
        x="22"
        y="14"
        width="2"
        height="2"
        className="gamepad-button button-top"
      />
      <rect
        x="20"
        y="16"
        width="2"
        height="2"
        className="gamepad-button button-left"
      />
      <rect
        x="24"
        y="16"
        width="2"
        height="2"
        className="gamepad-button button-right"
      />
      <rect
        x="22"
        y="18"
        width="2"
        height="2"
        className="gamepad-button button-bottom"
      />

      {/* Center buttons/screen */}
      <rect
        x="14"
        y="15"
        width="2"
        height="2"
        className="gamepad-center center-left"
      />
      <rect
        x="16"
        y="15"
        width="2"
        height="2"
        className="gamepad-center center-right"
      />

      {/* Shoulder buttons indicators (top corners) */}
      <rect
        x="6"
        y="10"
        width="4"
        height="2"
        className="gamepad-shoulder shoulder-left"
      />
      <rect
        x="22"
        y="10"
        width="4"
        height="2"
        className="gamepad-shoulder shoulder-right"
      />

      {/* Grip details (bottom sides) */}
      <rect
        x="4"
        y="22"
        width="3"
        height="2"
        className="gamepad-grip grip-left"
      />
      <rect
        x="25"
        y="22"
        width="3"
        height="2"
        className="gamepad-grip grip-right"
      />
    </svg>
  );
}
