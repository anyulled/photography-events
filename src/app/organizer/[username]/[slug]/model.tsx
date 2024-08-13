import { UserProfile } from "@/components/data/generateData";
import Link from "next/link";
import Image from "next/image";

export function Model(props: { model: UserProfile }) {
  return (
    <Link href={`/model/${props.model.username}`}>
      <Image
        alt={props.model.name}
        src={props.model.profileUrl}
        width={192}
        height={192}
        className="inline-block h-48 w-48 rounded-full ring-2 ring-white"
      />
    </Link>
  );
}
