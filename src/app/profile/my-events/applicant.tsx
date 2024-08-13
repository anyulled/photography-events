"use client";
import Link from "next/link";
import { EnvelopeIcon, UserIcon } from "@heroicons/react/24/solid";
import { Label, Radio, RadioGroup } from "@headlessui/react";
import { UserProfile } from "@/components/data/generateData";
import { useState } from "react"; /* eslint-disable @next/next/no-img-element */

/* eslint-disable @next/next/no-img-element */

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

const statusOptions = [
  {
    name: "Pending",
    value: "pending",
    color: "bg-orange-100",
    selectedColor: "bg-orange-600",
  },
  {
    name: "Approved",
    value: "accepted",
    color: "bg-teal-100",
    selectedColor: "bg-teal-600",
  },
  {
    name: "Rejected",
    value: "rejected",
    color: "bg-red-100",
    selectedColor: "bg-red-600",
  },
  {
    name: "Confirmed",
    value: "confirmed",
    color: "bg-blue-100",
    selectedColor: "bg-blue-600",
  },
];

export interface Applicant extends UserProfile {
  status: "pending" | "accepted" | "rejected" | "confirmed";
}

export function Applicant(props: { person: Applicant }) {
  const [selectedStatus, setSelectedStatus] = useState<string>(
    props.person.status,
  );
  return (
    <li className="flex justify-between gap-x-6 py-5">
      <div className="flex min-w-0 gap-x-4">
        <Link href={`/photographer/${props.person.username}`}>
          <img
            alt={props.person.name}
            src={props.person.profileUrl}
            className="h-12 w-12 flex-none rounded-full bg-gray-50"
          />
        </Link>
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-900">
            <Link href={`/photographer/${props.person.username}`}>
              {props.person.name}
            </Link>
          </p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500 flex">
            <EnvelopeIcon className="w-5 h-5" />
            <a href={`mailto:${props.person.email}`}>
              <span className={"ml-1 mr-1"}>{props.person.email}</span>
            </a>
            <UserIcon className="w-5 h-5" />
            <Link href={`/photographer/${props.person.username}`}>
              <span className={"ml-1 mr-1"}>{props.person.username}</span>
            </Link>
          </p>
        </div>
      </div>
      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
        <RadioGroup value={selectedStatus} onChange={setSelectedStatus}>
          <div className="flex space-x-2">
            {statusOptions.map((status) => (
              <Radio
                key={status.value}
                value={status.value}
                className={({ hover, checked }) =>
                  classNames(
                    "relative flex cursor-pointer rounded-lg px-4 py-2 focus:outline-none text-white",
                    checked ? status.selectedColor : status.color,
                    hover
                      ? "ring-2 ring-offset-2 ring-offset-gray-300 ring-white ring-opacity-60"
                      : "",
                  )
                }
              >
                {({ checked }) => (
                  <>
                    <div className="flex items-center justify-center w-full">
                      <div className="text-sm">
                        <Label
                          as="span"
                          className={classNames(
                            "font-medium text-xs",
                            checked ? "text-white" : "text-gray-900",
                          )}
                        >
                          {status.name}
                        </Label>
                      </div>
                    </div>
                  </>
                )}
              </Radio>
            ))}
          </div>
        </RadioGroup>
      </div>
    </li>
  );
}
