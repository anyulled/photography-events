import { Metadata } from "next";
import { title } from "@/components/constants";

export type Props = {
  params: { username: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => ({
  title: `${title} ${params.username.replaceAll("-", " ")} - Photographer`,
});

export default function PhotographerDetail({
  params,
}: Readonly<{
  params: { username: string };
}>) {
  return (
    <>
      <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight capitalize">
        Photographer: {params.username}
      </h1>
      <section>
        <h2>Availability</h2>
      </section>
      <section>
        <h2>Events</h2>
      </section>
    </>
  );
}
