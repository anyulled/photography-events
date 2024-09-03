"use client";
/* eslint-disable @next/next/no-img-element */
import { Input } from "@/components/ui/input";
import ReactQuill from "react-quill";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Calendar as CalendarIcon,
  MapPin,
  Plus,
  Upload,
  User,
  X,
} from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Autocomplete, LoadScript } from "@react-google-maps/api";
import React, { useState } from "react";

export default function EventPublishForm(props: { eventData: any }) {
  //region State
  const [modelSearch, setModelSearch] = useState<string>("");
  const [photographerSearch, setPhotographerSearch] = useState<string>("");
  const [organizerSearch, setOrganizerSearch] = useState<string>("");

  const [description, setDescription] = useState<string>(
    props.eventData.description,
  );

  const [eventLocation, setEventLocation] = useState<string>(
    props.eventData.location,
  );
  const [startDate, setStartDate] = useState<Date | undefined>(
    props.eventData.startDate,
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    props.eventData.endDate,
  );
  const [images, setImages] = useState<Array<string>>(props.eventData.images);
  const [models, setModels] = useState<string[]>(props.eventData.models);
  const [photographers, setPhotographers] = useState<string[]>(
    props.eventData.photographers,
  );
  const [organizers, setOrganizers] = useState<string[]>(
    props.eventData.organizers,
  );
  const [schedule, setSchedule] = useState<
    {
      title: string;
      date: Date | undefined;
      location: string;
      price: string;
    }[]
  >(props.eventData.schedule);
  const [prices, setPrices] = useState<
    {
      option: string;
      price: string;
      startDate: Date | undefined;
      endDate: Date | undefined;
    }[]
  >(props.eventData.prices);
  const [eventTerms, setEventTerms] = useState(props.eventData.eventTerms);
  //endregion

  //region Handlers
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.value);
      setImages((prev) => [...prev, ...newImages].slice(0, 5));
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const addPerson = (
    person: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    setter((prev) => [...prev, person]);
  };

  const removePerson = (
    person: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    setter((prev) => prev.filter((p) => p !== person));
  };

  const addScheduleDay = () => {
    setSchedule((prev) => [
      ...prev,
      {
        title: "",
        date: undefined,
        location: "",
        price: "",
      },
    ]);
  };

  const updateScheduleDay = (
    index: number,
    field: string,
    value: string | Date | undefined,
  ) => {
    setSchedule((prev) =>
      prev.map((day, i) =>
        i === index
          ? {
              ...day,
              [field]: value,
            }
          : day,
      ),
    );
  };

  const addPriceOption = () => {
    setPrices((prev) => [
      ...prev,
      {
        option: "",
        price: "",
        startDate: undefined,
        endDate: undefined,
      },
    ]);
  };

  const updatePriceOption = (
    index: number,
    field: string,
    value: string | Date | undefined,
  ) => {
    setPrices((prev) =>
      prev.map((price, i) =>
        i === index
          ? {
              ...price,
              [field]: value,
            }
          : price,
      ),
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log("Form submitted", {
      startDate,
      endDate,
      images,
      models,
      photographers,
      organizers,
      schedule,
      prices,
      eventTerms,
    });
    alert("Event published successfully!");
  };
  //endregion

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Event Details */}
      <section className="space-y-4 px-3">
        <h2 className="text-2xl font-semibold text-teal-700">Event Details</h2>
        <Input placeholder="Event Title" className="max-w-md" required />
        <ReactQuill
          value={description}
          onChange={(value) => setDescription(value)}
          className="max-w-md"
          placeholder={"Describe your event"}
          theme={"snow"}
          formats={[
            "header",
            "bold",
            "italic",
            "underline",
            "strike",
            "blockquote",
            "list",
            "bullet",
            "link",
          ]}
          modules={{
            toolbar: [
              [{ header: [1, 2, 3, false] }],
              [
                "bold",
                "italic",
                "underline",
                "link",
                { list: "ordered" },
                { list: "bullet" },
                "blockquote",
                "clean",
              ],
            ],
          }}
        />

        <div className="flex items-center space-x-2">
          <Switch id="public-event" />
          <Label htmlFor="public-event">Public Event</Label>
        </div>
        <div className="flex space-x-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !startDate && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, "PPP") : <span>Start Date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !endDate && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, "PPP") : <span>End Date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </section>

      {/* Image Upload */}
      <section className="space-y-4 px-3">
        <h2 className="text-2xl font-semibold text-teal-700">Event Images</h2>
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-teal-300 border-dashed rounded-lg cursor-pointer bg-teal-50 hover:bg-teal-100"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-10 h-10 mb-3 text-teal-500" />
              <p className="mb-2 text-sm text-teal-500">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-teal-500">
                PNG, JPG or GIF (MAX. 5 images)
              </p>
            </div>
            <Input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={handleImageUpload}
              multiple
              accept="image/*"
            />
          </label>
        </div>
        <div className="flex flex-wrap gap-4 mt-4">
          {images.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={image}
                alt={`Uploaded ${index + 1}`}
                className="w-24 h-24 object-cover rounded"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Models */}
      <section className="space-y-4 px-3">
        <h2 className="text-2xl font-semibold text-teal-700">Models</h2>
        <div className="flex space-x-2">
          <Input
            placeholder="Search for models"
            value={modelSearch}
            onChange={(event) => setModelSearch(event.target.value)}
            className="max-w-md"
          />
          <Button
            type="button"
            onClick={() => addPerson(modelSearch, setModels)}
          >
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-4">
          {models.map((model, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 bg-orange-100 rounded-full py-1 px-3"
            >
              <User className="w-4 h-4" />
              <span>{model}</span>
              <button
                type="button"
                onClick={() => removePerson(model, setModels)}
              >
                <X className="w-4 h-4 text-red-500" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Event Schedule */}
      <section className="space-y-4 px-3">
        <h2 className="text-2xl font-semibold text-teal-700">Event Schedule</h2>
        {schedule.map((day, index) => (
          <div key={index} className="flex space-x-4 items-end">
            <Input
              placeholder="Day Title"
              value={day.title}
              onChange={(e) =>
                updateScheduleDay(index, "title", e.target.value)
              }
              className="max-w-xs"
            />
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !day.date && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {day.date ? (
                    format(day.date, "PPP")
                  ) : (
                    <span>Select date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={day.date}
                  onSelect={(date) => updateScheduleDay(index, "date", date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Input
              placeholder="Location"
              value={day.location}
              onChange={(e) =>
                updateScheduleDay(index, "location", e.target.value)
              }
              className="max-w-xs"
            />
            <Input
              placeholder="Price"
              value={day.price}
              onChange={(e) =>
                updateScheduleDay(index, "price", e.target.value)
              }
              className="max-w-xs"
            />
          </div>
        ))}
        <Button type="button" onClick={addScheduleDay} className="mt-2">
          <Plus className="w-4 h-4 mr-2" /> Add Day
        </Button>
      </section>

      {/* Event Location */}
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!}
        libraries={["places"]}
      >
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-teal-700">
            Event Location
          </h2>
          <div className="flex items-center space-x-2 max-w-md">
            <MapPin className="w-5 h-5 text-teal-500" />
            <Autocomplete>
              <Input
                placeholder="Enter city"
                onChange={(event) => setEventLocation(event.target.value)}
                value={eventLocation}
              />
            </Autocomplete>
          </div>
        </section>
      </LoadScript>

      {/* Photographers */}
      <section className="space-y-4 px-3">
        <h2 className="text-2xl font-semibold text-teal-700">Photographers</h2>
        <div className="flex space-x-2">
          <Input
            placeholder="Search for photographers"
            className="max-w-md"
            value={photographerSearch}
            onChange={(event) => setPhotographerSearch(event.target.value)}
          />
          <Button
            type="button"
            onClick={() => addPerson(photographerSearch, setPhotographers)}
          >
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-4">
          {photographers.map((photographer, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 bg-orange-100 rounded-full py-1 px-3"
            >
              <User className="w-4 h-4" />
              <span>{photographer}</span>
              <button
                type="button"
                onClick={() => removePerson(photographer, setPhotographers)}
              >
                <X className="w-4 h-4 text-red-500" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Event Organizers */}
      <section className="space-y-4 px-3">
        <h2 className="text-2xl font-semibold text-teal-700">
          Event Organizers
        </h2>
        <div className="flex space-x-2">
          <Input
            placeholder="Search for organizers"
            className="max-w-md"
            value={organizerSearch}
            onChange={(event) => setOrganizerSearch(event.target.value)}
          />
          <Button
            type="button"
            onClick={() => addPerson(organizerSearch, setOrganizers)}
          >
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-4">
          {organizers.map((organizer, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 bg-orange-100 rounded-full py-1 px-3"
            >
              <User className="w-4 h-4" />
              <span>{organizer}</span>
              <button
                type="button"
                onClick={() => removePerson(organizer, setOrganizers)}
              >
                <X className="w-4 h-4 text-red-500" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Event Terms */}
      <section className="space-y-4 px-3">
        <h2 className="text-2xl font-semibold text-teal-700">Event Terms</h2>
        <div className="space-y-2">
          <ReactQuill
            value={eventTerms}
            onChange={(value) => setEventTerms(value)}
            className="min-h-[200px] font-mono"
            placeholder={"Describe your event terms"}
            theme={"snow"}
            formats={[
              "header",
              "bold",
              "italic",
              "underline",
              "strike",
              "blockquote",
              "list",
              "bullet",
              "link",
            ]}
            modules={{
              toolbar: [
                [{ header: [1, 2, 3, false] }],
                [
                  "bold",
                  "italic",
                  "underline",
                  "link",
                  { list: "ordered" },
                  { list: "bullet" },
                  "blockquote",
                  "clean",
                ],
              ],
            }}
          />
        </div>
      </section>

      {/* Event Price */}
      <section className="space-y-4 px-3">
        <h2 className="text-2xl font-semibold text-teal-700">Event Price</h2>
        {prices.map((price, index) => (
          <div key={index} className="flex space-x-4 items-end">
            <Input
              placeholder="Price Option"
              value={price.option}
              onChange={(e) =>
                updatePriceOption(index, "option", e.target.value)
              }
              className="max-w-xs"
            />
            <Input
              placeholder="Price"
              value={price.price}
              onChange={(e) =>
                updatePriceOption(index, "price", e.target.value)
              }
              className="max-w-xs"
            />
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !price.startDate && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {price.startDate ? (
                    format(price.startDate, "PPP")
                  ) : (
                    <span>Start Date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={price.startDate}
                  onSelect={(date) =>
                    updatePriceOption(index, "startDate", date)
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !price.endDate && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {price.endDate ? (
                    format(price.endDate, "PPP")
                  ) : (
                    <span>End Date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={price.endDate}
                  onSelect={(date) => updatePriceOption(index, "endDate", date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        ))}
        <Button type="button" onClick={addPriceOption} className="mt-2">
          <Plus className="w-4 h-4 mr-2" /> Add Price Option
        </Button>
      </section>

      {/* Submit Button */}
      <Button
        type="submit"
        className="bg-orange-500 hover:bg-orange-600 text-white"
      >
        Publish Event
      </Button>
    </form>
  );
}
