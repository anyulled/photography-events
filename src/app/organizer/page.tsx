import { generatePersonData } from "@/app/components/data/generateData";
import { PersonData } from "@/app/components/personData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Model Events ↠ Organizer list",
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
