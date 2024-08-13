export function TermsSection(props: { terms: string }) {
  return (
    <section id="terms" className="pl-2 border-b border-b-gray-200 pb-6 pt-3">
      <h2 className="text-3xl font-bold text-teal-900 tracking-tight">Terms</h2>
      <p className="text-teal-900">{props.terms}</p>
    </section>
  );
}
