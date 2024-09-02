import OrangeBgButton from "@/components/ui/Button/OrangeBgButton";
import { EventDay } from "@/lib/types";

export function DayInfo(props: { event: EventDay; slug: string }) {
  return (
    <article className="flex max-w-xl flex-col items-start justify-between">
      <div className="flex items-center gap-x-4 text-xs">
        <time
          dateTime={props.event.date.toLocaleDateString()}
          className="text-orange-500"
        >
          {props.event.date.toLocaleDateString()}
        </time>
        <a
          href={props.event.category.href}
          className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-orange-600 hover:bg-orange-100"
        >
          {props.event.category.weekday}
        </a>
      </div>
      <div className="group relative">
        <h3 className="mt-3 text-lg font-semibold leading-6 text-orange-900 group-hover:text-orange-600">
          <span className="absolute inset-0" />
          {props.event.title}
        </h3>
        <p className="mt-5 line-clamp-3 text-sm leading-6 text-orange-900">
          {props.event.description}
        </p>
      </div>
      <div className="relative mt-8 flex items-center gap-x-4">
        <OrangeBgButton text="Register" url={`${props.slug}/register`} />
      </div>
    </article>
  );
}
