export default function OrganizerDetail({
  params,
}: {
  params: { username: string };
}) {
  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight capitalize">
        Organizer: {params.username}
      </h1>
      <section className="pl-2 border-b border-b-gray-200 pb-6 pt-3">
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
          Events
        </h2>
      </section>
      <p className="text-center">List of events</p>
    </main>
  );
}
