import Link from "next/link";
import getUnicodeFlagIcon from "country-flag-icons/unicode";
import React from "react";

export function CalendarEvent(props: {
  href: string;
  title: string;
  country: string;
  city: string;
}) {
  return (
    <div className="mt-2">
      <div className="text-gray-700 text-xs">
        <Link href={props.href}>{props.title}</Link>
      </div>
      <div className="text-gray-700 text-xs">
        {getUnicodeFlagIcon(props.country)} {props.city}
      </div>
    </div>
  );
}
