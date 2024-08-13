import { generatePersonData } from "@/components/data/generateData";
import { Applicant } from "@/app/profile/my-events/applicant";
import { faker } from "@faker-js/faker";
import { Metadata } from "next";
import { title } from "@/components/constants";
import Link from "next/link";
import getCountryFlag from "country-flag-icons/unicode";

interface OrganizerEvent {
  id: string;
  name: string;
  dateStart: string;
  dateEnd: string;
  maximumCapacity: number;
  location: {
    city: string;
    country: string;
  };
  applicants: Applicant[];
}

export const metadata: Metadata = {
  title: title + " My events",
};

const username = faker.internet.userName();

const generateRandomStatus = (): Applicant["status"] =>
  faker.helpers.arrayElement(["pending", "accepted", "rejected", "confirmed"]);

const myEvents: OrganizerEvent[] = [
  {
    id: faker.string.uuid(),
    name: "Shooting Melissa",
    dateStart: faker.date.future({ years: 1 }).toISOString().split("T")[0],
    dateEnd: faker.date.future({ years: 1 }).toISOString().split("T")[0],
    location: {
      city: faker.location.city(),
      country: faker.location.country(),
    },
    maximumCapacity: faker.number.int({ min: 3, max: 10 }),
    applicants: generatePersonData(5, "Photographer").map((user) => ({
      ...user,
      status: generateRandomStatus(),
    })),
  },
  {
    id: faker.string.uuid(),
    name: "Shooting Melanie",
    dateStart: faker.date.recent().toISOString().split("T")[0],
    dateEnd: faker.date.soon({ days: 2 }).toISOString().split("T")[0],
    maximumCapacity: faker.number.int({ min: 3, max: 10 }),
    location: {
      city: faker.location.city(),
      country: faker.location.country(),
    },
    applicants: generatePersonData(2, "Photographer").map((user) => ({
      ...user,
      status: generateRandomStatus(),
    })),
  },
  {
    id: faker.string.uuid(),
    name: "Shooting Montse",
    dateStart: faker.date.soon().toISOString().split("T")[0],
    dateEnd: faker.date.soon({ days: 2 }).toISOString().split("T")[0],
    maximumCapacity: faker.number.int({ min: 3, max: 10 }),
    location: {
      city: faker.location.city(),
      country: faker.location.country(),
    },
    applicants: generatePersonData(3, "Photographer").map((user) => ({
      ...user,
      status: generateRandomStatus(),
    })),
  },
];

export default function MyEventsPage() {
  return (
    <>
      {myEvents.map((event) => (
        <section
          key={event.id}
          className="border-b-gray-200 border-t pt-2 pb-1"
        >
          <h2 className="text-2xl font-bold leading-8 text-teal-900">
            <Link href={`/organizer/${username}/${event.name}`}>
              {event.name}
            </Link>
          </h2>
          <small className="text-teal-600">
            {getCountryFlag(event.location.country)} {event.location.city},{" "}
            {event.location.country}
            &rarr; {event.dateStart} - {event.dateEnd}
          </small>
          <span className=" ml-2 inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
            Capacity:{" "}
            {
              event.applicants.filter(
                (applicant) => applicant.status === "confirmed",
              ).length
            }
            {"/"}
            {event.maximumCapacity}
          </span>
          <ul className="divide-y divide-gray-100">
            {event.applicants.map((person) => (
              <Applicant key={person.id} person={person} />
            ))}
          </ul>
        </section>
      ))}
    </>
  );
}
