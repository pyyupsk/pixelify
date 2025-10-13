import type { ComponentType, SVGProps } from "react";
import { Coin, Download, PaintBucket, Zap } from "@/components/icons";

type Pill = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
};

export const pills: Pill[] = [
  {
    icon: Zap,
    label: "Instant Processing",
  },
  {
    icon: PaintBucket,
    label: "Multiple Styles",
  },
  {
    icon: Download,
    label: "Easy Download",
  },
  {
    icon: Coin,
    label: "Free to Use",
  },
];
