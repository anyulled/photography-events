export function DescriptionSection(props: { description: string }) {
  return (
    <section
      id="description"
      className="pl-2 border-b border-b-gray-200 pb-6 pt-3"
    >
      <p className="text-teal-900">{props.description}</p>
    </section>
  );
}
