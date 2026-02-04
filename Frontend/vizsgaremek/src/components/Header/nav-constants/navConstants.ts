export type NavItem = {
  to: string;
  label: string;
};

export const NAV_ITEMS: NavItem[] = [
  { to: "/phones", label: "iPhones" },
  { to: "/notebooks", label: "MacBooks" },
  { to: "/accessories", label: "Accessories" },
];
