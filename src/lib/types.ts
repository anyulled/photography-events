export interface UserProfile {
  id: string;
  name: string;
  username: string;
  profileUrl: string;
  email: string;
  role: string;
  city: string;
  phone: string;
  country: string;
  countryCode: string;
}

export interface ApplicantProfile extends UserProfile {
  status: "pending" | "accepted" | "rejected" | "confirmed";
}

export type PersonRole = "Model" | "Organizer" | "Photographer";

export interface Availability {
  id: string;
  city: string;
  country: string;

  dateFrom(): Date;

  dateUntil(): Date;
}

// Event

export interface Event {
  id: string;
  datetime: string;
  date: string;
  href: string;
  name: string;
  slug: string;
  organizer: string[];
  imageSrc: string;
  description: string;
}

export interface EventDay {
  id: string;
  date: Date;
  title: string;
  description: string;
  href: string;
  category: {
    weekday: string;
    href: string;
  };
}

export interface EventData {
  description: string;
  eventSchedule: Array<EventDay>;
  models: Array<UserProfile>;
  terms: string;
  organizers: Array<UserProfile>;
  location: {
    country: string;
    city: string;
    state: string;
    street: string;
    zipCode: string;
    latitude: number;
    longitude: number;
  };
  slug: string;
}

export type Update = {
  user: {
    name: string;
    instagram: string;
    role: string;
  };
  type: string;
  imageUrl: string;
  city: null | string;
  country: string;
  dateStart: string;
  dateEnd: string;
};

export interface PersonEvent {
  id: string;
  href: string;
  country: string;
  city: string;
  title: string;
  startDate: number;
  endDate: number;
  type: "Model" | "Photographer" | "Organizer";
}
