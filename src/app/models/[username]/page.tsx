import "react-big-calendar/lib/css/react-big-calendar.css";
import {fetchModelData} from "@/services/personService";
import PhotoGallery from "@/components/ui/PhotoGallery/PhotoGallery";
import AvailabilitySchedule
    from "@/components/ui/AvailabilitySchedule/AvailabiltySchedule";
import HeroGradient from "@/components/ui/HeroGradient/HeroGradient";
import UpcomingEvents from "@/components/ui/UpcomingEvents/UpcomingEvents";
import TravelNotices from "@/components/ui/TravelNotices/TravelNotices";
import {Metadata} from "next";
import {title} from "@/components/constants";
import {notFound} from "next/navigation";

export type Props = {
  params: { username: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => ({
  title: `${params.username} » Model — ${title} `,
});

export default async function Component({
  params,
}: Readonly<{
  params: { username: string };
}>) {
  const modelData = await fetchModelData(params.username);
    console.log(modelData)
  if (!modelData) {
    return notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Hero Section with Gradient */}
      <HeroGradient
        name={modelData.name}
        links={modelData.links}
        location={modelData.location}
        profileImage={modelData.profileImage}
        description={modelData.description}
      />

      {/* Photo Gallery */}
      <PhotoGallery photos={modelData.photos} />

      {/* Upcoming Events with Gradient */}
      {modelData.events.length > 0 && (
        <UpcomingEvents events={modelData.events} />
      )}

      {/* Travel Notices with Gradient */}
      {modelData.travelNotices.length > 0 && (
        <TravelNotices
          travelNotices={modelData.travelNotices}
          name={modelData.name}
        />
      )}

      {/* Availability Schedule */}
      <AvailabilitySchedule
        calendarEvents={modelData.events}
        travelNotices={modelData.travelNotices}
      />
    </div>
  );
}
