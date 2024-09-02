import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Clock, MapPin } from "lucide-react";
import { ModelEvent } from "@/services/personService";

export default function UpcomingEvents(props: { events: Array<ModelEvent> }) {
  return (
    <>
      <section className="py-12 bg-gradient-to-b from-teal-100 to-orange-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-teal-800 mb-8">
            Upcoming Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {props.events.map((event, index) => (
              <Card
                key={index}
                className="bg-white bg-opacity-80 backdrop-blur-sm"
              >
                <CardHeader>
                  <CardTitle className="text-teal-700">{event.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Image
                    src={event.image}
                    alt={event.title}
                    width={300}
                    height={200}
                    className="rounded-lg mb-4 shadow-md"
                  />
                  <div className="flex items-center text-gray-600 mb-2">
                    <Clock className="mr-2" />
                    <span>
                      {event.startDate.toLocaleDateString()} -{" "}
                      {event.endDate.toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="mr-2" />
                    <span>
                      {event.location.city}, {event.location.country}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
