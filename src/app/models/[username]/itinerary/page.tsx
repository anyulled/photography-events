import React from "react";
import Image from "next/image";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import {
  fetchModelData,
  ModelEvent,
  TravelNotice,
} from "@/services/personService";
import { title } from "@/components/constants";

type Props = {
  params: { username: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const username = params.username;

  const modelData = await fetchModelData(username);

  if (!modelData) {
    return notFound();
  }

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${modelData.name}'s Itinerary » ${title}`,
    description: `Upcoming events and travel notices for ${modelData.name}`,
    openGraph: {
      images: [modelData.profileImage, ...previousImages],
    },
  };
}

export default async function ModelItinerary({ params }: Readonly<Props>) {
  const modelData = await fetchModelData(params.username);

  if (!modelData) {
    return notFound();
  }

  interface CombinedModelEvent extends ModelEvent {
    type: string;
  }

  interface CombinedTravelNotice extends TravelNotice {
    type: string;
  }

  const combinedEvents: Array<CombinedModelEvent | CombinedTravelNotice> = [
    ...modelData.events.map(
      (event) =>
        ({
          ...event,
          type: "event",
        }) as CombinedModelEvent,
    ),
    ...modelData.travelNotices.map(
      (notice) =>
        ({
          ...notice,
          type: "travel",
        }) as CombinedTravelNotice,
    ),
  ].sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
  );

  const groupedEvents = combinedEvents.reduce(
    (acc, event) => {
      const month = new Date(event.startDate).toLocaleString("default", {
        month: "long",
        year: "numeric",
      });
      if (!acc[month]) {
        acc[month] = [];
      }
      acc[month].push(event);
      return acc;
    },
    {} as Record<string, typeof combinedEvents>,
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-orange-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-500 to-orange-400 py-2 lg:py-12 text-white">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <Image
            src={modelData.profileImage}
            alt={modelData.name}
            width={64}
            height={64}
            className="rounded-full border-2 lg:border-4 border-white shadow-lg lg:mb-4 mb-2"
          />
          <h1 className=" text-lg lg:text-3xl font-bold lg:mb-2 mb-0.5">
            {modelData.name}
          </h1>
          <p className="lg:text-xl text-sm lg:mb-2 mb-1">
            {modelData.location.city}, {modelData.location.country}
          </p>
          <div className="w-full max-w-md">
            <p className="text-center lg:h-20 h-5 overflow-hidden relative text-xs lg:text-base">
              {modelData.description}
            </p>
          </div>
        </div>
      </section>

      {/* Itinerary */}
      <section className="py-2 lg:py-6">
        <div className="container mx-auto px-1 lg:px-4">
          <h2 className="text-lg font-bold text-teal-800 mb-0.5 text-center lg:text-2xl lg:mb-4">
            Upcoming Itinerary
          </h2>
          {Object.entries(groupedEvents).map(([month, events]) => (
            <div key={month} className="lg:mb-8 mb-1">
              <h3 className="lg:text-xl text-base font-semibold text-orange-600 lg:mb-4 mb-0.5">
                {month}
              </h3>
              <div className="lg:space-y-4 space-y-0.5">
                {events.map((event, index) => (
                  <div
                    key={index + event.startDate.toLocaleTimeString()}
                    className="bg-white lg:rounded-lg lg:shadow-md lg:p-4 p-0.5"
                  >
                    {event.type === "event" ? (
                      <>
                        <h4 className="font-semibold text-teal-700">
                          {event.title}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {event.startDate.toLocaleDateString()} -{" "}
                          {event.endDate.toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-600">
                          {event.location.city}, {event.location.country}
                        </p>
                      </>
                    ) : (
                      <>
                        <h4 className="font-semibold text-teal-700 lg:text-base text-sm">
                          Available in {event.city}, {event.country}
                        </h4>
                        <p className="lg:text-sm text-xs text-gray-600">
                          {event.startDate.toLocaleDateString()} -{" "}
                          {event.endDate.toLocaleDateString()}
                        </p>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
