import { UserProfile } from "@/components/data/generateData";
import { Model } from "./model";

export function ModelSection(props: { models: Array<UserProfile> }) {
  return (
    <section id="models" className="pl-2 border-b border-b-gray-200 pb-6 pt-3">
      <h2 className="text-3xl font-bold text-teal-900 tracking-tight pb-3">
        Models
      </h2>
      <div className="flex -space-x-3 overflow-hidden text-center">
        {props.models.map((model) => (
          <Model key={model.id} model={model} />
        ))}
      </div>
    </section>
  );
}
