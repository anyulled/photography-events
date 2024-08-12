import { generatePersonData } from "@/app/components/data/generateData";
import { PersonData } from "@/app/components/personData";
import { Metadata } from "next";
import { title } from "@/app/components/constants";

export const metadata: Metadata = {
  title: `${title} Photographer list`,
};

export default function Photographers() {
  return (
    <>
      <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight capitalize">
        Photographers
      </h1>
      <section>
        <ul className="divide-y divide-gray-100">
          {generatePersonData(10, "Photographer").map((person) => (
            <PersonData key={person.id} person={person} />
          ))}
        </ul>
      </section>
    </>
  );
}
