import { generatePersonData } from "@/components/data/generateData";
import { PersonData } from "@/components/ui/personData";
import { Metadata } from "next";
import { title } from "@/components/constants";

export const metadata: Metadata = {
  title: title + " Organizer list",
};

export default function Models() {
  return (
    <>
      <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight capitalize">
        Organizers
      </h1>
      <section>
        <ul role="list" className="divide-y divide-gray-100">
          {generatePersonData(10, "Organizer").map((person) => (
            <PersonData key={person.id} person={person} />
          ))}
        </ul>
      </section>
    </>
  );
}
