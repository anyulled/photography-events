import { DayInfo } from "@/app/events/[slug]/dayInfo";
import { EventDay } from "@/lib/types";

export function ScheduleSection(props: {
  eventDays: Array<EventDay>;
  slug: string;
}) {
  return (
    <section
      id="schedule"
      className="pl-2 border-b border-b-gray-200 pb-6 pt-3"
    >
      <h2 className="text-3xl font-bold tracking-tight text-teal-900 sm:text-4xl">
        Schedule
      </h2>
      <div className="flex items-center gap-x-4">
        {props.eventDays.map((eventDay) => (
          <DayInfo key={eventDay.id} event={eventDay} slug={props.slug} />
        ))}
      </div>
    </section>
  );
}
