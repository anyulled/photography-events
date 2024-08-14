import React from "react";
import {
  generateAvailability,
  generateEvents,
  generatePersonData,
} from "@/components/data/generateData";
import EventList from "@/components/ui/eventList";
import EventCalendar, { PersonEvent } from "@/components/ui/EventCalendar";
import { PersonPresentation } from "@/components/ui/personPresentation";
import { PersonMenu } from "@/app/components/ui/personMenu";

const availability = generateAvailability(1);

const calendarEvents: Array<PersonEvent> = availability.map((a) => ({
  id: a.id,
  href: `/person/`,
  city: a.city,
  country: a.country,
  startDate: a.dateFrom().getDate(),
  endDate: a.dateUntil().getDate(),
  title: "Available",
  type: "Model",
}));

const events = generateEvents(3);

const person = generatePersonData(1, "Model")[0];

export default function ModelDetail({
  params,
}: Readonly<{
  params: { username: string };
}>) {
  return (
    <>
      <div className="lg:flex lg:items-center lg:justify-between">
        <PersonPresentation person={person} />
        <PersonMenu />
      </div>
      <EventCalendar events={calendarEvents} />
      <EventList events={events} />
    </>
  );
}
