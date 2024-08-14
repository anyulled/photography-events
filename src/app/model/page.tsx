import { generatePersonData } from "@/components/data/generateData";
import { PersonData } from "@/components/ui/personData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Model Events ↠ Model list",
};

export default function Models() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight capitalize">
        Models
      </h1>
      <section>
        <ul role="list" className="divide-y divide-gray-100">
          {generatePersonData(10, "Model").map((person) => (
            <PersonData key={person.id} person={person} />
          ))}
        </ul>
      </section>
    </main>
  );
}
