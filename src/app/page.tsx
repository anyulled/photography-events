"use client";
import Banner from "@/components/ui/banner/Banner";
import Link from "next/link";
import OrangeTextButton from "@/components/ui/Button/OrangeTextButton";
import Image from "next/image";

type People = {
  name: string;
  instagram: string;
  role: string;
  imageUrl: string;
  city: null | string;
  country?: string;
};

const people: Array<People> = [
  {
    name: "Leslie Alexander",
    instagram: "@leslie_alexander",
    role: "Model",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    city: "Barcelona",
    country: "Spain 🇪🇸",
  },
  {
    name: "Michael Foster",
    instagram: "@michael_foster",
    role: "Photographer",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    city: "Viena",
    country: "Austria 🇦🇹",
  },
  {
    name: "Dries Vincent",
    instagram: "@driesvincent",
    role: "Organizer",
    imageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    city: "Valencia",
    country: "Spain 🇪🇸",
  },
  {
    name: "Lindsay Walton",
    instagram: "@lindsay_walton",
    role: "Model",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    city: "Lyon",
    country: "France 🇫🇷",
  },
  {
    name: "Courtney Henry",
    instagram: "@courtney_henry",
    role: "Model",
    imageUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    city: "Madrid",
    country: "Spain 🇪🇸",
  },
  {
    name: "Tom Cook",
    instagram: "@tom_cook",
    role: "Organizer",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    city: "Iceland",
    country: "Iceland 🇮🇸",
  },
];

export default function Home() {
  return (
    <main>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-orange-500 to-yellow-500 py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-white mb-4">
              Welcome to our website
            </h1>
            <p className="text-lg text-white mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              euismod justo ac massa malesuada, vel bibendum velit bibendum.
            </p>
            <OrangeTextButton text="Register" url={""} />
          </div>
        </div>

        <div className="container mx-auto py-12">
          <Banner />
          <div className="flex">
            <div id={"Column 1"} className="bg-gray-200 p-8 rounded-lg w-1/3">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Updates</h2>
              <ul className="divide-y divide-gray-100">
                {people.map((person) => (
                  <li
                    key={person.instagram}
                    className="flex justify-between gap-x-6 py-5"
                  >
                    <div className="flex min-w-0 gap-x-4">
                      <Image
                        alt={person.name}
                        src={person.imageUrl}
                        className="h-12 w-12 flex-none rounded-full bg-gray-50"
                      />
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">
                          <Link
                            href={`/${person.role.toLocaleLowerCase()}/${person.instagram}`}
                          >
                            {person.name}
                          </Link>
                        </p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                          <Link
                            href={`/${person.role.toLocaleLowerCase()}/${person.instagram}`}
                          >
                            {person.instagram}
                          </Link>
                        </p>
                      </div>
                    </div>
                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                      <p className="text-sm leading-6 text-gray-900">
                        {person.role}
                      </p>

                      <p className="mt-1 text-xs leading-5 text-gray-500">
                        <span>
                          {person.city}, {person.country}
                        </span>
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div
              id={"Column 2"}
              className="bg-gray-200 p-8 rounded-lg w-2/3 px-8"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Column 2
              </h2>{" "}
              Calendar goes here
              {/*<Calendar startAccesor="start"
                                              endAccessor="end"
                                              localizer={localizer}
                                              style={{height: 800}}/>*/}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
