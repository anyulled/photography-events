import Link from "next/link";
import getUnicodeFlagIcon from "country-flag-icons/unicode";
import React from "react";

interface CalendarEventProps {
  event: {
    title: string;
    href: string;
    country: string;
    city: string;
  };
}

export function CalendarEvent(props: CalendarEventProps) {
  return (
    <div className="mt-2">
      <div className="text-gray-700 text-xs">
        <Link href={props.event.href}>{props.event.title}</Link>
      </div>
      <div className="text-gray-700 text-xs">
        {getUnicodeFlagIcon(props.event.country)} {props.event.city}
      </div>
    </div>
  );
}
