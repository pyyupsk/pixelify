import {
  SiBluesky,
  SiGithub,
  SiMaildotru,
} from "@icons-pack/react-simple-icons";
import type { ElementType } from "react";

type ContactMethod = {
  icon: ElementType;
  title: string;
  description: string;
  href: string;
  label: string;
};

export const contacts: ContactMethod[] = [
  {
    icon: SiGithub,
    title: "GitHub Issues",
    description: "Report bugs, request features, or ask technical questions",
    href: "https://github.com/pyyupsk/pixelify/issues",
    label: "Open an Issue",
  },
  {
    icon: SiMaildotru,
    title: "Email",
    description: "For general inquiries and support",
    href: "mailto:contact@fasu.dev",
    label: "Send Email",
  },
  {
    icon: SiBluesky,
    title: "Social Media",
    description: "Follow for updates and announcements",
    href: "https://bsky.app/profile/fasu.dev",
    label: "@fasu.dev",
  },
];
