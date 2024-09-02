import { Organizer } from "@/app/events/[slug]/organizer";
import { UserProfile } from "@/lib/types";

export function OrganizerSection(props: { organizers: Array<UserProfile> }) {
  return (
    <section id="contact" className="pl-2 border-b border-b-gray-200 pb-6 pt-3">
      <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-teal-900 sm:text-4xl">
            Meet the Organizers
          </h2>
        </div>
        <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
          {props.organizers.map((organizer) => (
            <Organizer key={organizer.id} person={organizer} />
          ))}
        </ul>
      </div>
    </section>
  );
}
