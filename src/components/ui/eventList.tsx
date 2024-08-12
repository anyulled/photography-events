import React from "react";
import { Event } from "@/components/data/generateData";
import Image from "next/image";

interface Props {
  events: Readonly<Array<Event>>;
}

export default function EventList({ events }: Readonly<Props>) {
  return (
    <div className="bg-orange-200 rounded">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-4 sm:py-24 lg:max-w-none lg:py-8">
          <h2 className="text-2xl font-bold text-orange-800">Events</h2>

          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
            {events.map((callout) => (
              <div key={callout.id} className="group relative">
                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                  <Image
                    alt={callout.name}
                    src={callout.imageSrc}
                    height={320}
                    width={320}
                    className="h-full w-full object-cover object-center rounded"
                  />
                </div>
                <h3 className="mt-6 text-sm text-orange-400">
                  <a href={callout.href}>
                    <span className="absolute inset-0" />
                    {callout.name}
                  </a>
                </h3>
                <p className="text-base font-semibold text-orange-600">
                  {callout.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
