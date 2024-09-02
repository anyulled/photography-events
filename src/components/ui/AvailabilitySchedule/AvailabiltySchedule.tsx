"use client";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment/moment";
import React, { useState } from "react";
import { ModelEvent, TravelNotice } from "@/services/personService"; //import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import getUnicodeFlagIcon from "country-flag-icons/unicode";

const localizer = momentLocalizer(moment);

export default function AvailabilitySchedule(props: {
  calendarEvents: Array<ModelEvent>;
  travelNotices: Array<TravelNotice>;
}) {
  const calendarEvents = [
    ...props.calendarEvents.map((event) => ({
      title: event.title,
      start: new Date(event.startDate),
      end: new Date(event.endDate),
      allDay: true,
      resource: "event",
    })),
    ...props.travelNotices.map((notice) => ({
      title: `${getUnicodeFlagIcon(notice.countryCode)} Available in ${notice.city} `,
      start: new Date(notice.startDate),
      end: new Date(notice.endDate),
      allDay: true,
      resource: "travel",
    })),
  ];

  const [date, setDate] = useState(new Date());

  const handleCalendarNavigate = (date: Date) => {
    console.log("Month ----->>>", moment(date).format("MMMM YYYY"));
    setDate(new Date(date));
  };

  return (
    <>
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-teal-800 mb-8">
            Availability Schedule
          </h2>
          <div style={{ height: "500px" }}>
            <Calendar
              localizer={localizer}
              events={calendarEvents}
              startAccessor="start"
              views={["month"]}
              date={date}
              onNavigate={handleCalendarNavigate}
            />
          </div>
        </div>
      </section>
    </>
  );
}
