import { Metadata } from "next";
import { faker } from "@faker-js/faker";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import {
  generateEventData,
  generatePersonData,
} from "@/components/data/generateData";
import OrangeBgButton from "@/components/ui/Button/OrangeBgButton";
import Image from "next/image";
import { WhatsappIcon } from "@/app/organizer/[username]/[slug]/whatsappIcon";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => ({
  title: `Model Events ↠ ${params.slug.replaceAll("-", " ")}`,
});

const organizers = generatePersonData(2, "Organizer");

const YOUR_API_KEY = process.env.GOOGLE_MAP_API_KEY;

const eventInfo = {
  location: {
    city: faker.location.city(),
    state: faker.location.state(),
    street: faker.location.street(),
    zipCode: faker.location.zipCode(),
    latitude: faker.location.latitude({
      min: 35.4335426,
      max: 43.9933088,
      precision: 10,
    }),
    longitude: faker.location.longitude({
      min: -8.3936845,
      max: 4.5918885,
      precision: 10,
    }),
  },
  description: faker.lorem.paragraphs(4),
  models: generatePersonData(5, "Model"),
  eventDays: generateEventData(3),
  terms: faker.lorem.paragraphs(6),
};

export default function EventDetails({
  params,
}: Readonly<{
  params: { slug: string };
}>) {
  return (
    <>
      <section id="title">
        <h1 className="font-thin text-xs">Event</h1>
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight capitalize">
          {params.slug.replaceAll("-", " ")}
        </h2>
      </section>
      <section
        id="description"
        className="pl-2 border-b border-b-gray-200 pb-6 pt-3"
      >
        <p className="text-gray-500">{eventInfo.description}</p>
      </section>
      <section
        id="models"
        className="pl-2 border-b border-b-gray-200 pb-6 pt-3"
      >
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight pb-3">
          Models
        </h2>
        <div className="flex -space-x-3 overflow-hidden text-center">
          {eventInfo.models.map((model) => (
            <Link href={`/model/${model.username}`} key={model.id}>
              <Image
                alt={model.name}
                src={model.profileUrl}
                width={192}
                height={192}
                className="inline-block h-48 w-48 rounded-full ring-2 ring-white"
              />
            </Link>
          ))}
        </div>
      </section>
      <section
        id="schedule"
        className="pl-2 border-b border-b-gray-200 pb-6 pt-3"
      >
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Schedule
        </h2>
        <div className="flex items-center gap-x-4">
          {eventInfo.eventDays.map((event) => (
            <article
              key={event.id}
              className="flex max-w-xl flex-col items-start justify-between"
            >
              <div className="flex items-center gap-x-4 text-xs">
                <time dateTime={event.datetime} className="text-gray-500">
                  {event.date}
                </time>
                <a
                  href={event.category.href}
                  className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                >
                  {event.category.title}
                </a>
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                  <a href={event.href}>
                    <span className="absolute inset-0" />
                    {event.title}
                  </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                  {event.description}
                </p>
              </div>
              <div className="relative mt-8 flex items-center gap-x-4">
                <OrangeBgButton
                  text="Register"
                  url={`${params.slug}/register`}
                />
              </div>
            </article>
          ))}
        </div>
      </section>
      <section
        id="location"
        className="pl-2 border-b border-b-gray-200 pb-6 pt-3"
      >
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Location
        </h2>
        <div className="flex gap-x-4 sm:flex-col md:flex-row">
          <Image
            width={650}
            height={300}
            src={`https://maps.googleapis.com/maps/api/staticmap?center=${
              {
                latitude: faker.location.latitude({
                  min: 35.4335426,
                  max: 43.9933088,
                  precision: 10,
                }),
                longitude: faker.location.longitude({
                  min: -8.3936845,
                  max: 4.5918885,
                  precision: 10,
                }),
              }.latitude
            },${
              {
                latitude: faker.location.latitude({
                  min: 35.4335426,
                  max: 43.9933088,
                  precision: 10,
                }),
                longitude: faker.location.longitude({
                  min: -8.3936845,
                  max: 4.5918885,
                  precision: 10,
                }),
              }.longitude
            }&zoom=8&size=650x300&maptype=roadmap&key=${YOUR_API_KEY}`}
            alt={params.slug}
          />
          <div className="border-t border-gray-200 pt-4 ml-5">
            <dt className="font-medium text-gray-900">
              {eventInfo.location.city}, {eventInfo.location.state}
            </dt>
            <dd className="mt-2 text-sm text-gray-500">
              {eventInfo.location.street}, {eventInfo.location.zipCode}
            </dd>
          </div>
        </div>
      </section>
      <section id="terms" className="pl-2 border-b border-b-gray-200 pb-6 pt-3">
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
          Terms
        </h2>
        <p className="text-neutral-600">{eventInfo.terms}</p>
      </section>
      <section
        id="contact"
        className="pl-2 border-b border-b-gray-200 pb-6 pt-3"
      >
        <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Meet the Organizers
            </h2>
          </div>
          <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
            {organizers.map((person) => (
              <li key={person.name}>
                <div className="flex items-center gap-x-6">
                  <Link href={`/organizer/${person.username}`}>
                    <Image
                      alt={person.name}
                      src={person.profileUrl}
                      width={64}
                      height={64}
                      className="h-16 w-16 rounded-full"
                    />
                  </Link>
                  <div>
                    <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                      <Link href={`/organizer/${person.username}`}>
                        {person.name}
                      </Link>
                    </h3>
                    <p className="text-sm font-semibold leading-6 text-indigo-600">
                      {person.role}
                    </p>
                    <div className="flex">
                      <PhoneIcon className="w-5 h-5" />
                      <p className="ml-2 text-sm font-semibold leading-6 text-indigo-400">
                        <a href={`tel:${person.phone}`}> {person.phone}</a>
                      </p>
                      <a
                        href={`https://wa.me/${person.phone.toString().replaceAll("-", "")}`}
                      >
                        <WhatsappIcon />
                      </a>
                    </div>
                    <div className="flex">
                      <EnvelopeIcon className="w-5 h-5" />
                      <p className="ml-2 text-sm font-semibold leading-6 text-indigo-400">
                        {person.email}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
