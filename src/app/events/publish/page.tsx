import React from "react";
import "react-quill/dist/quill.snow.css";
import EventPublishForm from "@/app/events/publish/EventPublishForm";
import { getEventFormData } from "@/services/eventService";

export default async function EventPublishPage() {
  const eventData = await getEventFormData(0);
  return (
    <div className="min-h-screen bg-teal-50 flex flex-col">
      <>
        <h1 className="text-3xl font-bold text-teal-800 mb-8">
          Publish New Event
        </h1>
        <EventPublishForm eventData={eventData} />
      </>
    </div>
  );
}
