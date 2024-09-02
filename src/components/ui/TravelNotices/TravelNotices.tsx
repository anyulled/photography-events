"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TravelNotice } from "@/services/personService";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { shootTypes } from "@/components/constants";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import getUnicodeFlagIcon from "country-flag-icons/unicode";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

export default function TravelNotices(props: {
  travelNotices: Array<TravelNotice>;
  name: string;
}) {
  const [bookingOpen, setBookingOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );
  const [fromDate, setFromDate] = useState<Date>(new Date());
  const [toDate, setToDate] = useState<Date>(new Date());
  const [selectedShootTypes, setSelectedShootTypes] = useState<Array<string>>(
    [],
  );

  const handleBookNow = (
    startDate: string | number | Date,
    fromDate: string | number | Date,
    toDate: string | number | Date,
  ) => {
    setSelectedDate(new Date(startDate));
    setFromDate(new Date(fromDate));
    setToDate(new Date(toDate));
    setBookingOpen(true);
  };

  const handleShootTypeChange = (shootType: string) =>
    setSelectedShootTypes((prev: string[]) =>
      prev.includes(shootType)
        ? prev.filter((type: string) => type !== shootType)
        : [...prev, shootType],
    );

  const handleBookingSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElements = e.currentTarget.elements;
    console.log("Booking submitted:", formElements);
    setBookingOpen(false);
  };

  return (
    <>
      <section className="py-12 bg-gradient-to-r from-orange-100 to-teal-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-teal-800 mb-8">
            Travel Notices
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {props.travelNotices.map((notice, index) => (
              <Card
                key={index}
                className="flex flex-col justify-between bg-white bg-opacity-80 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-teal-700">
                        {getUnicodeFlagIcon(notice.countryCode)} {notice.city},{" "}
                        {notice.country}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {notice.startDate.toLocaleDateString()} -{" "}
                        {notice.endDate.toLocaleDateString()}
                      </p>
                    </div>
                    <Button
                      onClick={() =>
                        handleBookNow(
                          notice.startDate,
                          notice.startDate,
                          notice.endDate,
                        )
                      }
                      size="sm"
                      className="bg-teal-500 hover:bg-teal-600 text-white"
                    >
                      Book Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* Booking Modal */}
      <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Book a Session</DialogTitle>
            <DialogDescription>
              Fill out the form below to book a session with {props.name} on{" "}
              {selectedDate && selectedDate.toDateString()}.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleBookingSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" required />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required />
            </div>
            <div className={"flex flex-col"}>
              <label>Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? (
                      format(selectedDate, "PPP")
                    ) : (
                      <span>Selected Date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={{
                      before: fromDate,
                      after: toDate,
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label htmlFor="startTime">Start Time</Label>
              <Input id="startTime" name="startTime" type="time" required />
            </div>
            <div>
              <Label htmlFor="endTime">End Time</Label>
              <Input id="endTime" name="endTime" type="time" required />
            </div>
            <div>
              <Label>Shoot Types</Label>
              <div className="grid grid-cols-2 gap-2">
                {shootTypes.map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={type}
                      checked={selectedShootTypes.includes(type)}
                      onCheckedChange={() => handleShootTypeChange(type)}
                    />
                    <label
                      htmlFor={type}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {type}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" required />
            </div>
            <Button
              type="submit"
              className="bg-teal-500 hover:bg-teal-600 text-white"
            >
              Submit Booking Request
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
