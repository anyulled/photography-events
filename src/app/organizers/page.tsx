import { Hero } from "@/components/ui/Hero/hero";
import { PersonList } from "@/components/ui/PersonList/personList";
import { fetchPersonList } from "@/services/personService";
import { Metadata } from "next";
import { title } from "@/components/constants";

export const metadata: Metadata = {
  title: `${title} Organizer list`,
};

export default async function Component() {
  const organizers = await fetchPersonList("organizer");

  return (
    <main className="flex-1">
      <Hero
        title={"Discover Top Organizers"}
        description={
          "Find and connect with professional organizers for your\n" +
          "                            next project or\n" +
          "                            event."
        }
      />
      {organizers.length > 0 ? (
        <PersonList persons={organizers} personType={"organizer"} />
      ) : (
        <div className="text-center mx-auto py-4">No users found</div>
      )}
    </main>
  );
}
