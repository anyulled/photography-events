import { Metadata } from "next";
import { title } from "@/components/constants";

export const metadata: Metadata = {
  title: title + " Location List",
};

export default function LocationList() {
  return (
    <>
      <h1>Location list</h1>
      <section>
        <div>Location 1</div>
        <div>Location 2</div>
        <div>Location 3</div>
        <div>Location 3</div>
      </section>
    </>
  );
}
