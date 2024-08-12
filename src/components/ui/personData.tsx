import { UserProfile } from "@/components/data/generateData";
import Link from "next/link";
import getUnicodeFlagIcon from "country-flag-icons/unicode";
import Image from "next/image";

export const PersonData = (props: { person: UserProfile }) => (
  <li className="flex justify-between gap-x-6 py-5">
    <div className="flex min-w-0 gap-x-4">
      <Image
        alt={props.person.name}
        src={props.person.profileUrl}
        width={48}
        height={48}
        className="h-12 w-12 flex-none rounded-full bg-gray-50"
      />
      <div className="min-w-0 flex-auto">
        <p className="text-sm font-semibold leading-6 text-gray-900">
          <Link
            href={`/${props.person.role.toLocaleLowerCase()}/${props.person.username}`}
          >
            {props.person.name}
          </Link>
        </p>
        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
          <Link
            href={`/${props.person.role.toLocaleLowerCase()}/${props.person.username}`}
          >
            @{props.person.username}
          </Link>
        </p>
      </div>
    </div>
    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
      <p className="text-sm leading-6 text-gray-900">{props.person.role}</p>

      <p className="mt-1 text-xs leading-5 text-gray-500">
        <span>
          <Link
            href={`/location/${props.person.city.replaceAll(" ", "-").toLowerCase()}`}
          >
            {props.person.city}, {props.person.country}{" "}
          </Link>
          {getUnicodeFlagIcon(props.person.countryCode)}
        </span>
      </p>
    </div>
  </li>
);
