"use client";
import {Calendar, Event, momentLocalizer, View} from "react-big-calendar";
import moment from "moment/moment";
import React, {useState} from "react";
import {ModelEvent, TravelNotice} from "@/services/personService";
import "react-big-calendar/lib/css/react-big-calendar.css";
import getUnicodeFlagIcon from "country-flag-icons/unicode";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";

const localizer = momentLocalizer(moment);

export default function AvailabilitySchedule(props: {
    calendarEvents: Array<ModelEvent>;
    travelNotices: Array<TravelNotice>;
}) {

    //region state
    const [title, setTitle] = useState<any>("");
    const [description, setDescription] = useState<string>("");
    const [open, setOpen] = useState(false);
    const [view, setView] = useState<View>("month");
    const [date, setDate] = useState(new Date());
    //endregion

    /*navigator.geolocation.getCurrentPosition(position => {
        fetch(`/api/location?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`).then(value => value.json()).then(value => {
            console.log(value);
        })

    });*/

    const calendarEvents = [
        ...props.calendarEvents.map((event) => ({
            title: event.title,
            start: new Date(event.startDate),
            end: new Date(event.endDate),
            allDay: true,
            resource: "event",
            username: event.username
        })),
        ...props.travelNotices.map((notice) => ({
            title: `${getUnicodeFlagIcon(notice.countryCode)} ${notice.username} Available in ${notice.city} `,
            start: new Date(notice.startDate),
            end: new Date(notice.endDate),
            allDay: true,
            resource: "travel",
            username: notice.username
        })),
    ];

    //region handlers
    const handleCalendarNavigate = (date: Date) => {
        setDate(new Date(date));
    };

    const handleSelectedEvent = (event: Event) => {
        setOpen(true);
        setTitle(event.title ?? "Travel notice");
        setDescription(`Available from ${event.start?.toLocaleDateString()} to ${event.end?.toLocaleDateString()}`)
    };
    //endregion

    return (
        <section className="py-12 bg-gray-100">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-teal-800 mb-8">
                    Availability Schedule
                </h2>
                <div style={{height: "500px"}}>
                    <Calendar
                        localizer={localizer}
                        events={calendarEvents}
                        startAccessor="start"
                        views={["month", "week"]}
                        view={view}
                        date={date}
                        onNavigate={handleCalendarNavigate}
                        onSelectEvent={handleSelectedEvent}
                        onView={setView} popup={true}
                    />
                </div>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>🛫 Travel Notice</DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        <p>{description}</p>
                        <p className={"font-bold my-2 text-center"}><Link
                            href="/models">Book session</Link></p>
                    </DialogDescription>
                </DialogContent>
            </Dialog>
        </section>
    );
}
