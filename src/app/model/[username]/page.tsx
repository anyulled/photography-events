"use client";
import {
  BriefcaseIcon,
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  CurrencyDollarIcon,
  LinkIcon,
  MapPinIcon,
  PencilIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import React from "react";
import { faker } from "@faker-js/faker";
import { Calendar } from "@/components/ui/calendar";
import getUnicodeFlagIcon from "country-flag-icons/unicode";
import {
  generateAvailability,
  generateEvents,
} from "@/app/components/data/generateData";
import EventList from "@/app/components/EventList";
import Link from "next/link";

const availability = generateAvailability(3);

const events = generateEvents(3);

export default function ModelDetail({
  params,
}: Readonly<{
  params: { username: string };
}>) {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <>
      <div className="lg:flex lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            @{params.username}
          </h2>
          <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <BriefcaseIcon
                aria-hidden="true"
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
              />
              Full-time
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <MapPinIcon
                aria-hidden="true"
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
              />
              Remote
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <CurrencyDollarIcon
                aria-hidden="true"
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
              />
              $120k &ndash; $140k
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <CalendarIcon
                aria-hidden="true"
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
              />
              Closing on January 9, 2020
            </div>
          </div>
        </div>
        <div className="mt-5 flex lg:ml-4 lg:mt-0">
          <span className="hidden sm:block">
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              <PencilIcon
                aria-hidden="true"
                className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
              />
              Edit
            </button>
          </span>

          <span className="ml-3 hidden sm:block">
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              <LinkIcon
                aria-hidden="true"
                className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
              />
              View
            </button>
          </span>

          <span className="sm:ml-3">
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <CheckIcon
                aria-hidden="true"
                className="-ml-0.5 mr-1.5 h-5 w-5"
              />
              Publish
            </button>
          </span>

          {/* Dropdown */}
          <Menu as="div" className="relative ml-3 sm:hidden">
            <MenuButton className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400">
              More
              <ChevronDownIcon
                aria-hidden="true"
                className="-mr-1 ml-1.5 h-5 w-5 text-gray-400"
              />
            </MenuButton>

            <MenuItems
              transition
              className="absolute right-0 z-10 -mr-1 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <MenuItem>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                >
                  Edit
                </a>
              </MenuItem>
              <MenuItem>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                >
                  View
                </a>
              </MenuItem>
            </MenuItems>
          </Menu>
        </div>
      </div>
      <div
        id="content"
        className="mx-auto max-w-2xl px-2 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:grid-rows-[auto,auto,1fr] lg:gap-x-4 lg:px-6 lg:pb-24 lg:pt-16"
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
          <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Week View</h2>
              <button
                type="button"
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <PlusIcon
                  aria-hidden="true"
                  className="-ml-0.5 mr-1.5 h-5 w-5"
                />
                Add Event
              </button>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {/* Header */}
              <div className="bg-gray-200 p-2 text-sm text-gray-600">
                Monday
              </div>
              <div className="bg-gray-200 p-2 text-sm text-gray-600">
                Tuesday
              </div>
              <div className="bg-gray-200 p-2 text-sm text-gray-600">
                Wednesday
              </div>
              <div className="bg-gray-200 p-2 text-sm text-gray-600">
                Thursday
              </div>
              <div className="bg-gray-200 p-2 text-sm text-gray-600">
                Friday
              </div>
              <div className="bg-gray-200 p-2 text-sm text-gray-600">
                Saturday
              </div>
              <div className="bg-gray-200 p-2 text-sm text-gray-600">
                Sunday
              </div>
              {/* Events */}
              {availability.map((data) => (
                <div key={data.id} className="bg-white p-2 text-sm">
                  <div className="bg-gray-300 m-2 p-2">
                    <Link
                      href={`/model/${params.username}/${data.dateFrom.toISOString().split("T")[0]}`}
                    >
                      {getUnicodeFlagIcon(data.country)} - {data.city},{" "}
                      {data.country}{" "}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <EventList events={events} />
    </>
  );
}
