import { Metadata } from "next";
import { faker } from "@faker-js/faker";
import {
  generateEventData,
  generatePersonData,
} from "@/components/data/generateData";
import { OrganizerSection } from "@/app/events/[slug]/organizerSection";
import { TermsSection } from "@/app/events/[slug]/termsSection";
import { LocationSection } from "@/app/events/[slug]/locationSection";
import { ScheduleSection } from "@/app/events/[slug]/scheduleSection";
import { ModelSection } from "@/app/events/[slug]/modelSection";
import { DescriptionSection } from "@/app/events/[slug]/descriptionSection";
import { TitleSection } from "@/app/events/[slug]/titleSection";
import { EventData } from "@/lib/types";
import { getEvent } from "@/services/eventService";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => ({
  title: `Model Events ↠ ${params.slug.replaceAll("-", " ")}`,
});

const eventInfo: EventData = {
  slug: faker.lorem.slug(3),
  location: {
    country: faker.location.country(),
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
  eventSchedule: generateEventData(3),
  terms: faker.lorem.paragraphs(6),
  organizers: generatePersonData(2, "Organizer"),
};

export default async function EventDetails({
  params,
}: Readonly<{
  params: { slug: string };
}>) {
  console.log(await getEvent(1));

  return (
    <>
      <TitleSection slug={params.slug} />
      <DescriptionSection description={eventInfo.description} />
      <ModelSection models={eventInfo.models} />
      <ScheduleSection eventDays={eventInfo.eventSchedule} slug={params.slug} />
      <LocationSection location={eventInfo.location} />
      <TermsSection terms={eventInfo.terms} />
      <OrganizerSection organizers={eventInfo.organizers} />
    </>
  );
}
