import { UserProfile } from "@/components/data/generateData";
import Link from "next/link";
import Image from "next/image";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/solid";
import { WhatsappIcon } from "@/app/organizer/[username]/[slug]/whatsappIcon";

export function Organizer(props: { person: UserProfile }) {
  return (
    <li>
      <div className="flex items-center gap-x-6">
        <Link href={`/organizer/${props.person.username}`}>
          <Image
            alt={props.person.name}
            src={props.person.profileUrl}
            width={64}
            height={64}
            className="h-16 w-16 rounded-full"
          />
        </Link>
        <div>
          <h3 className="text-base font-semibold leading-7 tracking-tight text-orange-900">
            <Link href={`/organizer/${props.person.username}`}>
              {props.person.name}
            </Link>
          </h3>
          <p className="text-sm font-semibold leading-6 text-orange-600">
            {props.person.role}
          </p>
          <div className="flex">
            <PhoneIcon className="w-5 h-5" />
            <p className="ml-2 text-sm font-semibold leading-6 text-orange-400">
              <a href={`tel:${props.person.phone}`}> {props.person.phone}</a>
            </p>
            <a
              href={`https://wa.me/${props.person.phone.toString().replaceAll("-", "")}`}
            >
              <WhatsappIcon />
            </a>
          </div>
          <div className="flex">
            <EnvelopeIcon className="w-5 h-5" />
            <p className="ml-2 text-sm font-semibold leading-6 text-orange-400">
              {props.person.email}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
}
