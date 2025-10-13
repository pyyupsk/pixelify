import type { ComponentType, SVGProps } from "react";
import { Download, Edit, Upload } from "@/components/icons";

type Step = {
  number: number;
  title: string;
  description: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export const steps: Step[] = [
  {
    number: 1,
    title: "Upload Your Image",
    description:
      "Drag and drop any image or click to browse from your device. Supports all common image formats.",
    icon: Upload,
  },
  {
    number: 2,
    title: "Customize Style",
    description:
      "Adjust pixel size, colors, and effects. Preview changes in real-time as you tweak settings.",
    icon: Edit,
  },
  {
    number: 3,
    title: "Download & Share",
    description:
      "Export your pixel art in your preferred format and resolution. Ready to use anywhere!",
    icon: Download,
  },
];
