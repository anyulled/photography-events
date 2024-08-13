import { Metadata } from "next";
import { faker } from "@faker-js/faker";
import {
  EventDay,
  generateEventData,
  generatePersonData,
  UserProfile,
} from "@/components/data/generateData";
import { OrganizerSection } from "@/app/organizer/[username]/[slug]/organizerSection";
import { TermsSection } from "@/app/organizer/[username]/[slug]/termsSection";
import { LocationSection } from "@/app/organizer/[username]/[slug]/locationSection";
import { ScheduleSection } from "@/app/organizer/[username]/[slug]/scheduleSection";
import { ModelSection } from "@/app/organizer/[username]/[slug]/modelSection";
import { DescriptionSection } from "@/app/organizer/[username]/[slug]/descriptionSection";
import { TitleSection } from "@/app/organizer/[username]/[slug]/titleSection";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => ({
  title: `Model Events ↠ ${params.slug.replaceAll("-", " ")}`,
});

export interface EventData {
  description: string;
  eventDays: Array<EventDay>;
  models: Array<UserProfile>;
  terms: string;
  organizers: Array<UserProfile>;
  location: {
    city: string;
    state: string;
    street: string;
    zipCode: string;
    latitude: number;
    longitude: number;
  };
  slug: string;
}

const eventInfo: EventData = {
  slug: faker.lorem.slug(3),
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
  organizers: generatePersonData(2, "Organizer"),
};

export default function EventDetails({
  params,
}: Readonly<{
  params: { slug: string };
}>) {
  return (
    <>
      <TitleSection slug={params.slug} />
      <DescriptionSection description={eventInfo.description} />
      <ModelSection models={eventInfo.models} />
      <ScheduleSection eventDays={eventInfo.eventDays} slug={params.slug} />
      <LocationSection location={eventInfo.location} />
      <TermsSection terms={eventInfo.terms} />
      <OrganizerSection organizers={eventInfo.organizers} />
    </>
  );
}
