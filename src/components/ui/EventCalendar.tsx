import React from "react";
import NavigationControl from "@/components/ui/NavigationControl";
import { classNames } from "@/components/constants";
import getUnicodeFlagIcon from "country-flag-icons/unicode";
import Link from "next/link";
import { CalendarEvent } from "@/components/ui/CalendarEvent";

const Calendar: React.FC = () => {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
  });
  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow p-6">
        <header className="flex items-center justify-between pb-4 border-b">
          <h1 className="text-lg font-semibold">
            {formattedDate.format(new Date())}
          </h1>
          <div className="flex items-center space-x-4">
            <NavigationControl />
          </div>
        </header>
        <div className="grid grid-cols-7 gap-4 mt-4 text-center text-sm">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <div key={day} className="font-semibold text-gray-600">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-0.5 mt-4">
          {/* Days */}
          {Array.from({ length: 35 }, (_, index) => (
            <div
              key={index}
              className="h-32 bg-gray-50 border border-gray-200 rounded-lg p-2 relative"
            >
              <span
                className={classNames(
                  "text-xs",
                  index == new Date().getDate() + 2
                    ? "bg-purple-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                    : " text-gray-500 absolute top-1 left-1",
                )}
              >
                {index < 3 || index > 33 ? "" : index - 2}{" "}
                {/* Example logic to render day numbers */}
              </span>
              {/* Example events */}
              {index === 4 && (
                <>
                  <CalendarEvent
                    href={`/organizer/sadie-gray/august-spain-tour-2024`}
                    country="ES"
                    city="Barcelona"
                    title="Sadie Gray"
                  />
                  <div className="mt-2">
                    <div className="text-gray-700 text-xs">
                      <Link
                        href={`/organizer/anna-sweet/august-spain-tour-2024`}
                      >
                        Ana Sweet
                      </Link>
                    </div>
                    <div className="text-gray-700 text-xs">
                      {getUnicodeFlagIcon("US")} Madrid
                    </div>
                  </div>
                </>
              )}
              {index === 5 && (
                <div className="mt-2">
                  <div className="text-gray-700 text-xs">
                    <Link href={`/organizer/inn-events/croatia-2024`}>
                      INN Events
                    </Link>
                  </div>
                  <div className="text-gray-700 text-xs">
                    {getUnicodeFlagIcon("CR")} Croatia
                  </div>
                </div>
              )}

              {index >= 23 && index <= 25 && (
                <div className="mt-2">
                  <div className="text-gray-700 text-xs">
                    <Link href={`/organizer/shoot-party/france-2024`}>
                      Shoot party
                    </Link>
                  </div>
                  <div className="text-gray-700 text-xs">
                    {getUnicodeFlagIcon("FR")} France
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
