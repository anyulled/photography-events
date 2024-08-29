import { faker } from "@faker-js/faker";
import {
  Availability,
  Event,
  EventDay,
  PersonRole,
  Update,
  UserProfile,
} from "@/lib/types";

export const generatePersonData = (
  num: number = 10,
  role: PersonRole | "",
): Array<UserProfile> =>
  Array.from({ length: num }, () => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    username: faker.internet.userName(),
    profileUrl: faker.image.avatar(),
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
    date: faker.date.recent(),
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraphs(2),
    href: faker.internet.url(),
    category: {
      weekday: faker.date.weekday(),
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
