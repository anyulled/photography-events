import { Hero } from "@/components/ui/Hero/hero";
import { PersonList } from "@/components/ui/PersonList/personList";
import { fetchPersonList } from "@/services/personService";
import { Metadata } from "next";
import { title } from "@/components/constants";
import NotFound from "@/app/not-found";

export const metadata: Metadata = {
  title: `${title} Model list`,
};

export default async function Component() {
  const allModels = await fetchPersonList();

  if (!allModels) return NotFound();

  return (
    <main className="flex-1">
      <Hero
        title={"Discover Top Models"}
        description={
          "Find and connect with professional models for your\n" +
          "                            next project or\n" +
          "                            event."
        }
      />
      <PersonList persons={allModels} />
    </main>
  );
}
