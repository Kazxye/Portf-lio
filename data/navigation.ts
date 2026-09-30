export type NavItem = {
  index: string;
  label: string;
  href: `#${string}`;
};

export const navigation: NavItem[] = [
  { index: "01", label: "About", href: "#about" },
  { index: "02", label: "Work", href: "#work" },
  { index: "03", label: "Experience", href: "#experience" },
  { index: "04", label: "Contact", href: "#contact" },
];
