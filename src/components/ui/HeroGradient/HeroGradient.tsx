import Image from "next/image";
import Link from "next/link";
import { Globe, Instagram, MapPin } from "lucide-react";
import { Location, ModelLink } from "@/services/personService";

const getLinkIcon = (linkName: string) => {
  switch (linkName.toLowerCase()) {
    case "instagram":
      return <Instagram className="w-4 h-4 mr-1" />;
    default:
      return <Globe className="w-4 h-4 mr-1" />;
  }
};

export default function HeroGradient(props: {
  name: string;
  description: string;
  links: Array<ModelLink>;
  profileImage: string;
  location: Location;
}) {
  return (
    <section className="bg-gradient-to-r from-teal-500 to-orange-400 pb-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/4 mb-6 md:mb-0 mt-2">
            <Image
              src={props.profileImage}
              alt={props.name}
              width={300}
              height={300}
              className="rounded-full border-4 border-white shadow-lg"
            />
          </div>
          <div className="md:w-2/3 md:pl-8 text-white">
            <h1 className="text-4xl font-bold mb-4">{props.name}</h1>
            <p className="text-lg mb-4">{props.description}</p>
            <div className="flex flex-wrap gap-4 mb-4">
              {props.links.map((link, index) => (
                <Link
                  key={index}
                  href={link.url}
                  className="flex items-center text-white hover:text-orange-200 underline"
                >
                  {getLinkIcon(link.name)}
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="flex items-center">
              <MapPin className="mr-2" />
              <span>
                {props.location.city}, {props.location.country}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
