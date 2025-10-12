type NavigationItem = {
  href: string;
  label: string;
  icon: string;
};

export const navigates: NavigationItem[] = [
  {
    href: "/",
    label: "Home",
    icon: "pixelarticons:home",
  },
  {
    href: "/create",
    label: "Create",
    icon: "pixelarticons:gamepad",
  },
  {
    href: "/examples",
    label: "Examples",
    icon: "pixelarticons:image-gallery",
  },
  {
    href: "/docs",
    label: "Documentation",
    icon: "pixelarticons:book",
  },
];
