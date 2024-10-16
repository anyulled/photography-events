import Banner from "@/components/ui/banner/Banner";
import {HeroComponent} from "@/app/heroComponent";
import {UpdatesFeed} from "@/components/updatesFeed";
import AvailabilitySchedule
    from "@/components/ui/AvailabilitySchedule/AvailabiltySchedule";
import {getEventsHome, getUpdateFeed} from "@/services/eventService";

export default async function Home() {
    const events = await getEventsHome();
    const updates = await getUpdateFeed();

    return (
        <main>
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <HeroComponent/>
                <div>
                    <Banner/>
                    <div className="flex">
                        <UpdatesFeed updates={updates}/>
                        <div
                            id="Column 2"
                            className="bg-gray-200 pr-1 pl-2 pt-2 pb-2  rounded-lg w-2/3 px-8"
                        >
                            <AvailabilitySchedule calendarEvents={[]}
                                                  travelNotices={events}/>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
