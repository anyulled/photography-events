import {
  BriefcaseIcon,
  CalendarIcon,
  MapPinIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import { faker } from "@faker-js/faker";
import React from "react";
import { UserProfile } from "@/lib/types";

export function PersonPresentation(props: { person: UserProfile }) {
  return (
    <div className="min-w-0 flex-1">
      <h2 className="text-2xl font-bold leading-7 text-orange-900 sm:truncate sm:text-3xl sm:tracking-tight">
        {props.person.name}
      </h2>
      <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
        <div className="mt-2 flex items-center text-sm text-orange-800">
          <BriefcaseIcon
            aria-hidden="true"
            className="mr-1.5 h-5 w-5 flex-shrink-0 text-orange-700"
          />
          {props.person.role}
        </div>
        <div className="mt-2 flex items-center text-sm text-orange-800">
          <MapPinIcon
            aria-hidden="true"
            className="mr-1.5 h-5 w-5 flex-shrink-0 text-orange-700"
          />
          {props.person.country}, {props.person.city}
        </div>
        <div className="mt-2 flex items-center text-sm text-orange-800">
          <UserIcon
            aria-hidden="true"
            className="mr-1.5 h-5 w-5 flex-shrink-0 text-orange-700"
          />
          @{props.person.username}
        </div>
        <div className="mt-2 flex items-center text-sm text-orange-800">
          <CalendarIcon
            aria-hidden="true"
            className="mr-1.5 h-5 w-5 flex-shrink-0 text-orange-700"
          />
          Available next {faker.date.future().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}
