"use client";
import Banner from "@/components/ui/banner/Banner";
import EventCalendar from "@/components/ui/EventCalendar";
import { HeroComponent } from "@/app/heroComponent";
import { UpdatesFeed } from "@/components/updatesFeed";
import { generateUpdateFeed } from "@/components/data/generateData";
import { faker } from "@faker-js/faker";
import { PersonEvent } from "@/lib/types"; /* eslint-disable @next/next/no-img-element */

export default function Home() {
  const events: Array<PersonEvent> = [
    {
      id: faker.string.uuid(),
      title: "Sadie Gray",
      city: "Barcelona",
      country: "ES",
      href: `/organizer/sadiegray/spain-tour-2024`,
      startDate: 18,
      endDate: 24,
      type: "Model",
    },
  ];

  return (
    <main>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <HeroComponent />
        <div>
          <Banner />
          <div className="flex">
            <UpdatesFeed updates={generateUpdateFeed()} />
            <div
              id="Column 2"
              className="bg-gray-200 pr-1 pl-2 pt-2 pb-2  rounded-lg w-2/3 px-8"
            >
              <EventCalendar events={events} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
