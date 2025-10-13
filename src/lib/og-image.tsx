import type { CSSProperties, ReactElement } from "react";

type Props = {
  title: string;
  description: string;
  badge?: string;
};

export function OGImageTemplate({
  title,
  description,
  badge,
}: Readonly<Props>): ReactElement {
  const containerStyle: CSSProperties = {
    display: "flex",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    background: "#121212",
    fontFamily: "monospace",
  };

  const contentStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    padding: "80px",
    gap: "32px",
  };

  const headerStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: badge ? "space-between" : "center",
    ...(badge && { width: "100%" }),
  };

  const logoStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginBottom: "16px",
  };

  const gamepadStyle: CSSProperties = {
    width: "64px",
    height: "64px",
    position: "relative",
  };

  const logoTextStyle: CSSProperties = {
    fontSize: "48px",
    fontWeight: "700",
    color: "#f8f8f8",
    letterSpacing: "-0.02em",
  };

  const badgeStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 16px",
    border: "1px solid rgba(248, 248, 248, 0.2)",
    borderRadius: "0",
    backgroundColor: "transparent",
  };

  const badgeTextStyle: CSSProperties = {
    fontSize: "16px",
    color: "rgba(248, 248, 248, 0.7)",
  };

  const titleStyle: CSSProperties = {
    fontSize: "72px",
    fontWeight: "700",
    color: "#f8f8f8",
    lineHeight: 1.1,
    letterSpacing: "-0.02em",
  };

  const descriptionStyle: CSSProperties = {
    fontSize: "32px",
    color: "rgba(248, 248, 248, 0.7)",
    maxWidth: "800px",
    lineHeight: 1.4,
  };

  const footerStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: "12px",
    marginTop: "auto",
    fontSize: "20px",
    color: "rgba(248, 248, 248, 0.5)",
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <div style={headerStyle}>
          {/* Logo */}
          <div style={logoStyle}>
            <svg
              width={64}
              height={64}
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={gamepadStyle}
            >
              <title>Pixelify Logo</title>
              {/* Main body */}
              <rect x="4" y="10" width="24" height="12" fill="#f8f8f8" />
              <rect x="2" y="12" width="2" height="8" fill="#f8f8f8" />
              <rect x="28" y="12" width="2" height="8" fill="#f8f8f8" />

              {/* D-Pad (Left side) */}
              <rect x="8" y="14" width="2" height="6" fill="#121212" />
              <rect x="6" y="16" width="6" height="2" fill="#121212" />

              {/* Buttons (Right side) */}
              <rect x="22" y="14" width="2" height="2" fill="#121212" />
              <rect x="20" y="16" width="2" height="2" fill="#121212" />
              <rect x="24" y="16" width="2" height="2" fill="#121212" />
              <rect x="22" y="18" width="2" height="2" fill="#121212" />

              {/* Center buttons */}
              <rect x="14" y="15" width="2" height="2" fill="#121212" />
              <rect x="16" y="15" width="2" height="2" fill="#121212" />

              {/* Shoulder buttons */}
              <rect
                x="6"
                y="10"
                width="4"
                height="2"
                fill="rgba(248, 248, 248, 0.5)"
              />
              <rect
                x="22"
                y="10"
                width="4"
                height="2"
                fill="rgba(248, 248, 248, 0.5)"
              />

              {/* Grips */}
              <rect x="4" y="22" width="3" height="2" fill="#f8f8f8" />
              <rect x="25" y="22" width="3" height="2" fill="#f8f8f8" />
            </svg>
            <div style={logoTextStyle}>Pixelify</div>
          </div>

          {/* Badge */}
          {badge && (
            <div style={badgeStyle}>
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "#f8f8f8",
                }}
              />
              <span style={badgeTextStyle}>{badge}</span>
            </div>
          )}
        </div>

        {/* Title */}
        <div style={titleStyle}>{title}</div>

        {/* Description */}
        <div style={descriptionStyle}>{description}</div>

        {/* Footer */}
        <div style={footerStyle}>
          <span>pixelify.fasu.dev</span>
        </div>
      </div>
    </div>
  );
}

export const OG_IMAGE_SIZE = {
  width: 1200,
  height: 630,
} as const;

export const OG_IMAGE_CONTENT_TYPE = "image/png";
