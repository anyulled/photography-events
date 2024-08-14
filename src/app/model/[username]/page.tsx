"use client";
import { CheckIcon } from "@heroicons/react/20/solid";
import React from "react";
import { faker } from "@faker-js/faker";
import { Calendar } from "@/components/ui/calendar";
import {
  generateAvailability,
  generateEvents,
  generatePersonData,
} from "@/components/data/generateData";
import EventList from "@/components/ui/eventList";
import EventCalendar from "@/components/ui/EventCalendar";
import { PersonPresentation } from "@/components/ui/personPresentation";

const availability = generateAvailability(3);

const events = generateEvents(3);

const person = generatePersonData(1, "Model")[0];

export default function ModelDetail({
  params,
}: Readonly<{
  params: { username: string };
}>) {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <>
      <div className="lg:flex lg:items-center lg:justify-between">
        <PersonPresentation person={person} />
        <div className="mt-5 flex lg:ml-4 lg:mt-0">
          <span className="sm:ml-3">
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
            >
              <CheckIcon
                aria-hidden="true"
                className="-ml-0.5 mr-1.5 h-5 w-5"
              />
              Publish Availability
            </button>
          </span>
        </div>
      </div>
      <div
        id="content"
        className="mx-auto max-w-2xl px-2 pb-4 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:grid-rows-[auto,auto,1fr] lg:gap-x-4 lg:px-6 lg:pb-4 lg:pt-16"
      >
        <div id="column-1" className="h-max col-span-3">
          <Calendar
            mode="single"
            modifiers={{
              booked: [
                {
                  from: faker.date.soon({ days: 7 }),
                  to: faker.date.soon({ days: 10 }),
                },
              ],
            }}
            modifiersClassNames={{
              booked: "my-booked-class",
            }}
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </div>
        <div id="column-2" className="h-max col-span-9">
          <EventCalendar />
        </div>
      </div>
      <EventList events={events} />
    </>
  );
}
