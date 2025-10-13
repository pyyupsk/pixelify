import type { ComponentType, SVGProps } from "react";
import {
  DevicePhone,
  Heart,
  Image,
  Lock,
  Sliders_2,
  Zap,
} from "@/components/icons";

type Feature = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
};

export const features: Feature[] = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Transform your images in seconds with our optimized processing engine. No waiting, just instant results.",
  },
  {
    icon: Sliders_2,
    title: "Full Customization",
    description:
      "Adjust pixel size, color palette, and style to match your vision. Complete creative control at your fingertips.",
  },
  {
    icon: Image,
    title: "High Quality Output",
    description:
      "Export in multiple formats and resolutions. Perfect for games, art projects, or social media.",
  },
  {
    icon: Lock,
    title: "Privacy First",
    description:
      "Your images are processed locally in your browser. We never upload or store your personal photos.",
  },
  {
    icon: DevicePhone,
    title: "Works Everywhere",
    description:
      "Fully responsive design that works seamlessly on desktop, tablet, and mobile devices.",
  },
  {
    icon: Heart,
    title: "Free Forever",
    description:
      "No subscriptions, no hidden fees. All features are completely free to use, now and always.",
  },
];
