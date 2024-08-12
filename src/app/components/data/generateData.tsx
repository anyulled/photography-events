import { faker } from "@faker-js/faker";

export interface UserProfile {
  id: string;
  name: string;
  username: string;
  profileUrl: string;
  date: Date;
  role: string;
  city: string;
  phone: string;
  country: string;
  countryCode: string;
}

export interface EventDay {
  id: string;
  datetime: string;
  date: string;
  title: string;
  description: string;
  href: string;
  category: {
    title: string;
    href: string;
  };
  author: {
    name: string;
    role: string;
    imageUrl: string;
    href: string;
  };
}

export interface Availability {
  id: string;
  city: string;
  country: string;
  dateFrom: Date;
  dateUntil: Date;
}

export interface Event {
  id: string;
  datetime: string;
  date: string;
  href: string;
  name: string;
  imageSrc: string;
  description: string;
}

export const generatePersonData = (
  num: number = 10,
  role: "Model" | "Organizer" | "Photographer" | "" = "",
): Array<UserProfile> =>
  Array.from({ length: num }, () => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    username: faker.internet.userName(),
    profileUrl: faker.image.avatar(),
    date: faker.date.soon(),
    role:
      role ??
      faker.string.fromCharacters(["Model", "Photographer", "Organizer"]),
    city: faker.location.city(),
    country: faker.location.country(),
    phone: faker.helpers.fromRegExp("[0-9]{3}-[0-9]{3}-[0-9]{3}"),
    countryCode: faker.location.countryCode(),
  }));

export const generateEventData = (num: number = 10): Array<EventDay> =>
  Array.from({ length: num }, () => ({
    id: faker.string.uuid(),
    datetime: faker.date.recent().toISOString(),
    date: faker.date.recent().toLocaleDateString(),
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraphs(2),
    href: faker.internet.url(),
    category: {
      title: faker.date.weekday(),
      href: faker.internet.url(),
    },
    author: {
      name: faker.person.fullName(),
      role: faker.lorem.sentence(),
      imageUrl: faker.image.avatar(),
      href: faker.internet.url(),
    },
  }));

export const generateAvailability = (num: number = 7): Array<Availability> =>
  Array.from({ length: num }, () => ({
    id: faker.string.uuid(),
    city: faker.location.city(),
    country: faker.location.country(),
    dateFrom: faker.date.soon(),
    dateUntil: faker.date.soon({ days: 5 }),
  }));

export const generateEvents = (num: number): Array<Event> =>
  Array.from({ length: num }, () => ({
    id: faker.string.uuid(),
    datetime: faker.date.recent().toISOString(),
    date: faker.date.recent().toLocaleDateString(),
    name: faker.lorem.sentence(),
    href: faker.internet.url(),
    imageSrc: faker.image.urlLoremFlickr({ category: "model" }),
    description: faker.lorem.sentence(),
  }));
