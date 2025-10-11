import { Icon } from "@iconify/react";

export function TipsPanel() {
  return (
    <div className="border bg-card p-6">
      <h3 className="mb-4 font-semibold text-sm">Quick Tips</h3>
      <ul className="space-y-3 text-muted-foreground text-sm">
        <li className="flex gap-2">
          <Icon
            icon="pixelarticons:checkbox-on"
            width={16}
            height={16}
            className="mt-0.5 shrink-0"
          />
          <span>Start with pixel size 8-12 for best results</span>
        </li>
        <li className="flex gap-2">
          <Icon
            icon="pixelarticons:checkbox-on"
            width={16}
            height={16}
            className="mt-0.5 shrink-0"
          />
          <span>Lower color depth for retro look</span>
        </li>
        <li className="flex gap-2">
          <Icon
            icon="pixelarticons:checkbox-on"
            width={16}
            height={16}
            className="mt-0.5 shrink-0"
          />
          <span>Try dithering for smoother color transitions</span>
        </li>
        <li className="flex gap-2">
          <Icon
            icon="pixelarticons:checkbox-on"
            width={16}
            height={16}
            className="mt-0.5 shrink-0"
          />
          <span>All processing happens locally in your browser</span>
        </li>
      </ul>
    </div>
  );
}
