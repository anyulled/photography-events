import { faker } from "@faker-js/faker";

export interface UserProfile {
  id: string;
  name: string;
  username: string;
  profileUrl: string;
  email: string;
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
    weekday: string;
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

  dateFrom(): Date;

  dateUntil(): Date;
}

export interface Event {
  id: string;
  datetime: string;
  date: string;
  href: string;
  name: string;
  slug: string;
  organizer: string[];
  imageSrc: string;
  description: string;
}

type PersonRole = "Model" | "Organizer" | "Photographer";

export const generatePersonData = (
  num: number = 10,
  role: PersonRole | "",
): Array<UserProfile> =>
  Array.from({ length: num }, () => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    username: faker.internet.userName(),
    profileUrl: faker.image.avatar(),
    date: faker.date.soon(),
    email: faker.internet.email(),
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
      weekday: faker.date.weekday(),
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
    dateFrom() {
      return faker.date.soon({ days: faker.number.int({ min: 1, max: 25 }) });
    },
    dateUntil() {
      return faker.date.soon({ days: 5, refDate: this.dateFrom() });
    },
  }));

export const generateEvents = (num: number): Array<Event> =>
  Array.from({ length: num }, () => ({
    id: faker.string.uuid(),
    datetime: faker.date.recent().toISOString(),
    date: faker.date.recent().toLocaleDateString(),
    name: faker.lorem.sentence(),
    slug: faker.lorem.slug(),
    href: faker.internet.url(),
    organizer: [faker.internet.userName()],
    imageSrc: faker.image.urlLoremFlickr({ category: "model" }),
    description: faker.lorem.sentence(),
  }));
export type Update = {
  user: {
    name: string;
    instagram: string;
    role: string;
  };
  type: string;
  imageUrl: string;
  city: null | string;
  country: string;
  dateStart: string;
  dateEnd: string;
};
export const generateUpdateFeed = (num: number = 6): Array<Update> =>
  Array.from({ length: num }, () => ({
    user: {
      role: faker.string.fromCharacters(["Model", "Photographer", "Organizer"]),
      name: `${faker.person.firstName()} ${faker.person.lastName()}`,
      instagram: faker.internet.userName(),
    },
    type: faker.string.fromCharacters([
      "Model Availability",
      "Photographer Availability",
      "Organizer Event",
    ]),
    imageUrl: faker.image.avatar(),
    city: faker.location.city(),
    country: faker.location.country(),
    dateEnd: faker.date.recent({ days: 2 }).toISOString().split("T")[0],
    dateStart: faker.date.recent().toISOString().split("T")[0],
  }));
