export const title = "Photography Events ↠";
type Navigation = {
  name: string;
  href: string;
  current: boolean;
};
export const navigation: Array<Navigation> = [
  { name: "Home", href: "/", current: true },
  { name: "Models", href: "/model", current: false },
  { name: "Photographers", href: "/photographer", current: false },
  { name: "Organizers", href: "/organizer", current: false },
  { name: "Locations", href: "/location", current: false },
  { name: "Calendar", href: "#", current: false },
];

export const profileNavigation: Array<Navigation> = [
  {
    name: "Your Profile",
    href: "/profile",
    current: false,
  },
  { name: "My Events", href: "/profile/my-events", current: false },
  {
    name: "Settings",
    href: "/settings",
    current: false,
  },
  {
    name: "Logout",
    href: "/logout",
    current: false,
  },
];

export const classNames = (...classes: any[]) =>
  classes.filter(Boolean).join(" ");
