import { faker } from "@faker-js/faker";
import OrangeBgButton from "@/components/ui/Button/OrangeBgButton";
import { title } from "@/components/constants";
import { Metadata } from "next";

const event = {
  name: faker.lorem.sentence(),
  startDate: faker.date.recent(),
  endDate: faker.date.recent({ days: 2 }),
};

export type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => ({
  title: `${title} ${params.slug} - Registered`,
});

export default function RegisterPage() {
  return (
    <>
      <h1>Registered for {event.name}</h1>
      <h2>Registration is pending approval from organizer</h2>
      <small>
        {event.startDate.toLocaleString()} - {event.endDate.toLocaleString()}
      </small>
      <OrangeBgButton text={"Back"} url={""} />
    </>
  );
}
