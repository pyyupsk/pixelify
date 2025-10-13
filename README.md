# Pixelify

A modern web application that transforms images into pixel art with customizable settings. Built with Next.js 15, TypeScript, and Tailwind CSS.

![License](https://img.shields.io/badge/license-PolyForm%20Noncommercial-blue)
![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)

## Features

### ✅ Implemented

- **Advanced Image Processing**
  - Multiple dithering algorithms (Floyd-Steinberg, Bayer/Ordered)
  - Adjustable color depth (4-256 colors)
  - Color adjustments (brightness, contrast, saturation)
  - Configurable pixel size (1-32px)

- **Dual Processing Modes**
  - Client-side processing for real-time preview
  - Server-side API endpoint for programmatic access

- **User Interface**
  - Drag-and-drop image upload
  - Real-time preview with canvas rendering
  - Interactive settings panel
  - Mobile-responsive design
  - PWA support with offline capabilities

- **Developer Features**
  - TypeScript with strict mode
  - Zod schema validation
  - Jotai state management
  - Biome linting and formatting
  - MDX documentation support

- **SEO & Metadata**
  - Structured data (JSON-LD)
  - Open Graph images
  - Twitter Card support
  - Dynamic meta tags

### 🚧 Under Development

- **Documentation** (`/docs`)
  - Getting started guide (placeholder exists)
  - API reference documentation
  - Advanced settings explanations
  - Troubleshooting and FAQ section

- **Examples Gallery** (`/examples`)
  - Page structure complete
  - Needs actual example images and configurations
  - Category-based filtering implemented
  - Preset application system ready

- **Potential Future Features**
  - Batch image processing
  - Additional dithering algorithms (Atkinson, Burkes)
  - Export format options (GIF, WebP, animated sequences)
  - Share/embed functionality
  - User gallery or community features
  - Image history/undo system

## Getting Started

### Prerequisites

- Node.js 18+ or Bun runtime
- Modern web browser with Canvas API support

### Installation

```bash
# Clone the repository
git clone https://github.com/pyyupsk/pixelify.git
cd pixelify

# Install dependencies
bun install

# Start development server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Development Commands

```bash
# Development with Turbopack
bun run dev

# Production build
bun run build

# Start production server
bun start

# Linting and formatting
bun run lint          # Check code
bun run lint:fix      # Fix issues
bun run format        # Format code

# Type checking
bun run typecheck
```

## Project Structure

```text
pixelify/
├── src/
│   ├── app/               # Next.js App Router pages
│   │   ├── (pages)/       # Main application pages
│   │   ├── (docs)/        # Documentation pages
│   │   └── api/           # API routes
│   ├── components/        # React components
│   │   ├── ui/            # Reusable UI primitives
│   │   ├── layout/        # Layout components
│   │   ├── section/       # Page-specific sections
│   │   ├── markdown/      # MDX components
│   │   └── brand/         # Branding elements
│   ├── lib/               # Core utilities
│   │   └── pixel-art/     # Image processing algorithms
│   │       ├── core.ts    # Pure algorithms
│   │       ├── client.ts  # Browser utilities
│   │       ├── server.ts  # Node.js utilities
│   │       └── schema.ts  # Validation schemas
│   ├── hooks/             # Custom React hooks
│   ├── atoms/             # Jotai state atoms
│   ├── constants/         # Application constants
│   └── assets/            # Static assets and styles
└── public/                # Public static files
```

## API Usage

### POST /api/pixelart

Process an image with pixel art transformation.

```bash
curl -X POST https://pixelify.fasu.dev/api/pixelart \
  -H "Content-Type: application/json" \
  -d '{
    "image": "data:image/png;base64,...",
    "pixelSize": 8,
    "colorDepth": 32,
    "dithering": "floyd-steinberg",
    "brightness": 0,
    "contrast": 0,
    "saturation": 0
  }'
```

### GET /api/pixelart

Process an image from URL.

```bash
curl "https://pixelify.fasu.dev/api/pixelart?url=https://example.com/image.jpg&pixelSize=8&colorDepth=32"
```

## Technology Stack

- **Framework:** Next.js 15 (App Router, Turbopack)
- **Language:** TypeScript 5.9
- **Styling:** Tailwind CSS v4
- **State Management:** Jotai
- **Validation:** Zod
- **Icons:** @iconify/react (pixelarticons set)
- **Image Processing:** HTML Canvas API (client), node-canvas (server)
- **Documentation:** MDX with Shiki syntax highlighting
- **Linting:** Biome
- **Runtime:** Bun (recommended) or Node.js

## Design Philosophy

Pixelify follows a minimal, monochromatic design with a pixel-perfect aesthetic:

- **Zero border radius** - Sharp edges reinforce the pixel art theme
- **OKLCH color space** - Consistent, accessible colors
- **Icon-driven UI** - Pixel art icons throughout
- **Mobile-first** - Responsive design with touch support
- **Performance-focused** - Real-time processing with optimized algorithms

## Contributing

Contributions are welcome! Please check the [issues](https://github.com/pyyupsk/pixelify/issues) page for open tasks.

### Development Notes

- Use `@iconify/react` with `pixelarticons` set (NOT `lucide-react`)
- Follow Biome formatting rules (enforced on commit)
- Write type-safe code with Zod schemas
- Use Jotai atoms for state management
- Prefer `type` over `interface` for consistency
- Sort Tailwind classes using `useSortedClasses` rule

## License

This project is licensed under the [PolyForm Noncommercial License 1.0.0](LICENSE.md). See the [license page](https://pixelify.fasu.dev/license) for details.

## Author

Created and maintained by [Pongsakorn Thipayanate](https://github.com/pyyupsk).

## Acknowledgments

- Built with [Next.js](https://nextjs.org)
- Icons from [pixelarticons](https://pixelarticons.com)
- UI components inspired by [shadcn/ui](https://ui.shadcn.com)

## Status

**Current Version:** 0.1.0
**Development Stage:** ~85-90% Complete
**Production Ready:** Core features functional, content population in progress

---

For questions or support, visit the [contact page](https://pixelify.fasu.dev/contact) or [open an issue](https://github.com/pyyupsk/pixelify/issues).
