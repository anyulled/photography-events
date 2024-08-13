import Image from "next/image";
import { EventData } from "@/app/organizer/[username]/[slug]/page";

const YOUR_API_KEY = process.env.GOOGLE_MAP_API_KEY;

export function LocationSection(props: { location: EventData["location"] }) {
  return (
    <section
      id="location"
      className="pl-2 border-b border-b-gray-200 pb-6 pt-3"
    >
      <h2 className="text-3xl font-bold tracking-tight text-teal-900 sm:text-4xl pb-2">
        Location
      </h2>
      <div className="flex gap-x-4 sm:flex-col md:flex-row">
        <Image
          width={640}
          height={300}
          src={`https://maps.googleapis.com/maps/api/staticmap?center=${
            {
              latitude: props.location.latitude,
              longitude: props.location.longitude,
            }.latitude
          },${
            {
              latitude: props.location.latitude,
              longitude: props.location.longitude,
            }.longitude
          }&zoom=8&size=650x300&maptype=roadmap&key=${YOUR_API_KEY}`}
          alt={props.location.city}
        />
        <div className="border-t border-gray-200 pt-4 ml-5">
          <dt className="font-medium text-orange-900">
            {props.location.city}, {props.location.state}
          </dt>
          <dd className="mt-2 text-sm text-orange-500">
            {props.location.street}, {props.location.zipCode}
          </dd>
        </div>
      </div>
    </section>
  );
}
