type Example = {
  id: string;
  title: string;
  description: string;
  category: "portrait" | "landscape" | "object" | "abstract";
  settings: {
    pixelSize: number;
    colorDepth: 8 | 16 | 32 | 256;
    dithering: "none" | "floyd-steinberg" | "ordered";
  };
  originalUrl: string;
};

export const examples: Example[] = [
  {
    id: "portrait-1",
    title: "Classic Portrait",
    description: "8-bit style portrait with Floyd-Steinberg dithering",
    category: "portrait",
    settings: {
      pixelSize: 8,
      colorDepth: 16,
      dithering: "floyd-steinberg",
    },
    originalUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
  },
  {
    id: "landscape-1",
    title: "Mountain Sunset",
    description: "32-bit landscape with vibrant colors",
    category: "landscape",
    settings: {
      pixelSize: 12,
      colorDepth: 32,
      dithering: "none",
    },
    originalUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
  },
  {
    id: "object-1",
    title: "Retro Camera",
    description: "Fine detail with ordered dithering",
    category: "object",
    settings: {
      pixelSize: 6,
      colorDepth: 32,
      dithering: "ordered",
    },
    originalUrl: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
  },
  {
    id: "abstract-1",
    title: "Neon Lights",
    description: "8-bit color palette with high contrast",
    category: "abstract",
    settings: {
      pixelSize: 10,
      colorDepth: 8,
      dithering: "none",
    },
    originalUrl: "https://images.unsplash.com/photo-1557672172-298e090bd0f1",
  },
  {
    id: "landscape-2",
    title: "City Skyline",
    description: "Detailed architecture with full color depth",
    category: "landscape",
    settings: {
      pixelSize: 8,
      colorDepth: 256,
      dithering: "none",
    },
    originalUrl: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b",
  },
  {
    id: "portrait-2",
    title: "Street Portrait",
    description: "Gritty urban style with heavy pixelation",
    category: "portrait",
    settings: {
      pixelSize: 16,
      colorDepth: 16,
      dithering: "floyd-steinberg",
    },
    originalUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
  },
  {
    id: "object-2",
    title: "Fresh Fruit",
    description: "Colorful still life with medium pixelation",
    category: "object",
    settings: {
      pixelSize: 10,
      colorDepth: 32,
      dithering: "none",
    },
    originalUrl: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b",
  },
  {
    id: "abstract-2",
    title: "Geometric Patterns",
    description: "Sharp edges with ordered dithering",
    category: "abstract",
    settings: {
      pixelSize: 8,
      colorDepth: 16,
      dithering: "ordered",
    },
    originalUrl: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d",
  },
  {
    id: "landscape-3",
    title: "Forest Path",
    description: "Natural tones with subtle pixelation",
    category: "landscape",
    settings: {
      pixelSize: 6,
      colorDepth: 32,
      dithering: "floyd-steinberg",
    },
    originalUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
  },
];

export const categories = [
  { value: "all", label: "All Examples" },
  { value: "portrait", label: "Portraits" },
  { value: "landscape", label: "Landscapes" },
  { value: "object", label: "Objects" },
  { value: "abstract", label: "Abstract" },
] as const;
