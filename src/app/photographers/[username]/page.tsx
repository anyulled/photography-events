import { Metadata } from "next";
import { title } from "@/components/constants";
import EventList from "@/components/ui/eventList";
import React from "react";
import {
  generateAvailability,
  generateEvents,
  generatePersonData,
} from "@/components/data/generateData";
import EventCalendar from "@/components/ui/EventCalendar";
import { PersonPresentation } from "@/components/ui/personPresentation";
import { PersonEvent } from "@/lib/types";

export type Props = {
  params: { username: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const events = generateEvents(3);
const person = generatePersonData(1, "Photographer")[0];

const calendarEvents: Array<PersonEvent> = generateAvailability(2).map((a) => ({
  id: a.id,
  href: `/person/`,
  city: a.city,
  country: a.country,
  startDate: a.dateFrom().getDate(),
  endDate: a.dateUntil().getDate(),
  title: "Available",
  type: "Photographer",
}));

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => ({
  title: `${title} ${params.username.replaceAll("-", " ")} - Photographer`,
});

export default function PhotographerDetail({
  params,
}: Readonly<{
  params: { username: string };
}>) {
  return (
    <>
      <PersonPresentation person={person} />
      <section>
        <h2 className="text-2xl pl-3 pt-4 pb-1 tracking-tight">Availability</h2>
        <EventCalendar events={calendarEvents} />
      </section>
      <section>
        <EventList events={events} />
      </section>
    </>
  );
}
