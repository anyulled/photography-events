import { Metadata } from "next";
import { title } from "@/components/constants";
import { Hero } from "@/components/ui/Hero/hero";
import { PersonList } from "@/components/ui/PersonList/personList";
import { fetchPersonList } from "@/services/personService";

export const metadata: Metadata = {
  title: `Photographer list — ${title} `,
};

export default async function Photographers() {
  const allPhotographers = await fetchPersonList("photographer");
  return (
    <main className="flex-1">
      <Hero
        title={"Discover Top Photographers"}
        description={
          "Find and connect with professional photographers for your\n" +
          "                            next project or\n" +
          "                            event."
        }
      />
      <PersonList persons={allPhotographers} />
    </main>
  );
}
