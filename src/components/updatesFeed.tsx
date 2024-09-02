import Link from "next/link";
import getUnicodeFlagIcon from "country-flag-icons/unicode";

import { Update } from "@/lib/types"; /* eslint-disable @next/next/no-img-element */

/* eslint-disable @next/next/no-img-element */

export function UpdatesFeed(props: { updates: Array<Update> }) {
  return (
    <div id="Column 1" className="bg-teal-600 px-4 py-3 rounded-lg w-1/3">
      <h2 className="text-2xl font-bold text-teal-400 mb-2">Updates</h2>
      <ul className="divide-y divide-gray-100">
        {props.updates.map((update) => (
          <li
            key={update.user.instagram}
            className="flex justify-between gap-x-6 py-5"
          >
            <div className="flex min-w-0 gap-x-4">
              <img
                alt={update.user.name}
                src={update.imageUrl}
                height={48}
                width={48}
                className="h-12 w-12 flex-none rounded-full bg-gray-50"
              />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-teal-900">
                  <Link
                    href={`/${update.user.role.toLocaleLowerCase()}/${update.user.instagram}`}
                  >
                    {update.user.name}
                  </Link>
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-teal-400">
                  <Link
                    href={`/${update.user.role.toLocaleLowerCase()}/${update.user.instagram}`}
                  >
                    @{update.user.instagram}
                  </Link>
                </p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-teal-700">{update.type}</p>
              <p className="mt-1 text-xs leading-5 text-teal-400 truncate">
                <span className={"truncate"}>
                  {getUnicodeFlagIcon(update.country)} {update.city},{" "}
                  {update.country}
                </span>
              </p>
              <div className="flex">
                <span className="text-xs text-teal-200">
                  {update.dateStart}
                </span>
                <span className="text-xs text-teal-200">-</span>
                <span className="text-xs text-teal-200">{update.dateEnd}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
