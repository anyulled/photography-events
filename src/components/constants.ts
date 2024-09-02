export const title = "Photography Events ↠";
type Navigation = {
  name: string;
  href: string;
  current: boolean;
};
export const navigation: Array<Navigation> = [
  { name: "Home", href: "/", current: true },
  { name: "Models", href: "/models", current: false },
  { name: "Photographers", href: "/photographers", current: false },
  { name: "Organizers", href: "/organizers", current: false },
  { name: "Locations", href: "/locations", current: false },
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

export const shootTypes = [
  "Lifestyle",
  "Fashion",
  "Swimwear",
  "Covered semi-nude",
  "Covered nude",
  "Fetish",
  "Portrait",
  "Beauty",
  "Underwear",
  "Topless",
  "Nude",
];

export const classNames = (...classes: any[]) =>
  classes.filter(Boolean).join(" ");
