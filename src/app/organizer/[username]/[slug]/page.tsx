import { Metadata } from "next";
import { faker } from "@faker-js/faker";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import {
  EventDay,
  generateEventData,
  generatePersonData,
} from "@/app/components/data/generateData";
import OrangeBgButton from "@/app/components/Button/OrangeBgButton";

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

const models = generatePersonData(5, "Model");

const eventDays: Array<EventDay> = generateEventData(3);

const YOUR_API_KEY = process.env.GOOGLE_MAP_API_KEY;

const location = {
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
        <p className="text-gray-500">{faker.lorem.paragraphs(4)}</p>
      </section>
      <section
        id="models"
        className="pl-2 border-b border-b-gray-200 pb-6 pt-3"
      >
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight pb-3">
          Models
        </h2>
        <div className="flex -space-x-3 overflow-hidden text-center">
          {models.map((model) => (
            <Link href={`/model/${model.username}`} key={model.id}>
              <img
                alt={model.name}
                src={model.profileUrl}
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
          {eventDays.map((event) => (
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
          <img
            src={`https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=8&size=650x300&maptype=roadmap&key=${YOUR_API_KEY}`}
            alt={params.slug}
          />
          <div className="border-t border-gray-200 pt-4 ml-5">
            <dt className="font-medium text-gray-900">
              {faker.location.city()}, {faker.location.state()}
            </dt>
            <dd className="mt-2 text-sm text-gray-500">
              {faker.location.street()}, {faker.location.zipCode()}
            </dd>
          </div>
        </div>
      </section>
      <section id="terms" className="pl-2 border-b border-b-gray-200 pb-6 pt-3">
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
          Terms
        </h2>
        <p className="text-neutral-600">{faker.lorem.paragraphs(6)}</p>
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
                    <img
                      alt=""
                      src={person.profileUrl}
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
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          width="20"
                          height="20"
                          viewBox="0 0 48 48"
                        >
                          <path
                            fill="#fff"
                            d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z"
                          ></path>
                          <path
                            fill="#fff"
                            d="M4.868,43.803c-0.132,0-0.26-0.052-0.355-0.148c-0.125-0.127-0.174-0.312-0.127-0.483l2.639-9.636c-1.636-2.906-2.499-6.206-2.497-9.556C4.532,13.238,13.273,4.5,24.014,4.5c5.21,0.002,10.105,2.031,13.784,5.713c3.679,3.683,5.704,8.577,5.702,13.781c-0.004,10.741-8.746,19.48-19.486,19.48c-3.189-0.001-6.344-0.788-9.144-2.277l-9.875,2.589C4.953,43.798,4.911,43.803,4.868,43.803z"
                          ></path>
                          <path
                            fill="#cfd8dc"
                            d="M24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,4C24.014,4,24.014,4,24.014,4C12.998,4,4.032,12.962,4.027,23.979c-0.001,3.367,0.849,6.685,2.461,9.622l-2.585,9.439c-0.094,0.345,0.002,0.713,0.254,0.967c0.19,0.192,0.447,0.297,0.711,0.297c0.085,0,0.17-0.011,0.254-0.033l9.687-2.54c2.828,1.468,5.998,2.243,9.197,2.244c11.024,0,19.99-8.963,19.995-19.98c0.002-5.339-2.075-10.359-5.848-14.135C34.378,6.083,29.357,4.002,24.014,4L24.014,4z"
                          ></path>
                          <path
                            fill="#40c351"
                            d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z"
                          ></path>
                          <path
                            fill="#fff"
                            fillRule="evenodd"
                            d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </a>
                    </div>
                    <div className="flex">
                      <EnvelopeIcon className="w-5 h-5" />
                      <p className="ml-2 text-sm font-semibold leading-6 text-indigo-400">
                        {faker.internet.email()}
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
