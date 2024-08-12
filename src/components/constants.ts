export const title = "Model Events ↠";
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
