import EventList from "@/components/ui/eventList";
import {
  generateEvents,
  generatePersonData,
} from "@/components/data/generateData";
import { PersonData } from "@/components/ui/personData";
import type { Metadata } from "next";
import { title } from "@/components/constants";

const events = generateEvents(9);
const photographers = generatePersonData(3, "Photographer");
const models = generatePersonData(6, "Model");
const organizers = generatePersonData(2, "Organizer");

export type Props = {
  params: { city: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => ({
  title: `${title} ${params.city} - City`,
});

export default function LocationDetail({
  params,
}: Readonly<{
  params: { city: string };
}>) {
  return (
    <>
      <div className="bg-teal-200 rounded">
        <div className="container mx-auto py-16">
          <h1 className="text-4xl text-center font-bold text-teal-800">
            {params.city.toUpperCase()}
          </h1>
          <p className="text-center text-teal-600 mt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
      </div>
      <div
        id="content"
        className="mx-auto max-w-2xl px-2 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:grid-rows-[auto,auto,1fr] lg:gap-x-4 lg:px-6 lg:pb-24 lg:pt-16"
      >
        <div id="column1" className="h-max col-span-3">
          <section>
            <h2 className="text-lg font-bold tracking-tight text-teal-900 sm:text-lg">
              Models
            </h2>
            <ul className="divide-y divide-gray-100">
              {models.map((model) => (
                <PersonData key={model.id} person={model} />
              ))}
            </ul>
          </section>
          <section>
            <h2 className="text-lg font-bold tracking-tight text-teal-900 sm:text-lg">
              Photographers
            </h2>
            <ul className="divide-y divide-gray-100">
              {photographers.map((photographer) => (
                <PersonData key={photographer.id} person={photographer} />
              ))}
            </ul>
          </section>
          <section>
            <h2 className="text-lg font-bold tracking-tight text-teal-900 sm:text-lg">
              Organizers
            </h2>
            <ul className="divide-y divide-gray-100">
              {organizers.map((organizer) => (
                <PersonData key={organizer.id} person={organizer} />
              ))}
            </ul>
          </section>
        </div>
        <div id="column2" className="h-max col-span-9">
          <section id="event-list">
            <EventList events={events} />
          </section>
        </div>
      </div>
    </>
  );
}
