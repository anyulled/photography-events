export function TitleSection(props: { slug: string }) {
  return (
    <section id="title">
      <h1 className="font-thin text-xs text-orange-800">Event</h1>
      <h2 className="text-2xl font-bold leading-7 text-teal-900 sm:truncate sm:text-3xl sm:tracking-tight capitalize">
        {props.slug.replaceAll("-", " ")}
      </h2>
    </section>
  );
}
