import {
  getEvent,
  getEventFormData,
  getEventSchedule,
  getLocationInfo,
  getModels,
  getOrganizers,
} from "@/services/eventService";
import pool from "@/lib/db";

jest.mock("@/lib/db");

describe("Event Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("getLocationInfo should return location data", async () => {
    const mockLocation = {
      rows: [
        {
          city: "Sample City",
          country: "Sample Country",
          latitude: 12.34,
          longitude: 56.78,
          state: "Sample State",
          street: "Sample Street",
          zip_code: "12345",
        },
      ],
    };
    (pool.query as jest.Mock).mockResolvedValue(mockLocation);

    const result = await getLocationInfo(1);
    expect(result).toEqual({
      city: "Sample City",
      country: "Sample Country",
      latitude: 12.34,
      longitude: 56.78,
      state: "Sample State",
      street: "Sample Street",
      zipCode: "12345",
    });
  });

  test("getOrganizers should return an array of organizers", async () => {
    const mockUsers = {
      rows: [
        {
          id: 1,
          countryCode: "US",
          username: "organizer1",
          profileUrl: "http://example.com/profile1",
          city: "City1",
          name: "Organizer One",
          email: "organizer1@example.com",
          country: "Country1",
          role: "organizer",
          phone: "1234567890",
        },
      ],
    };
    (pool.query as jest.Mock).mockResolvedValue(mockUsers);

    const result = await getOrganizers(1);
    expect(result).toEqual([
      {
        id: 1,
        countryCode: "US",
        username: "organizer1",
        profileUrl: "http://example.com/profile1",
        city: "City1",
        name: "Organizer One",
        email: "organizer1@example.com",
        country: "Country1",
        role: "organizer",
        phone: "1234567890",
      },
    ]);
  });

  test("getEventSchedule should return an array of event days", async () => {
    const mockSchedule = {
      rows: [
        {
          id: 1,
          schedule_description: "Sample Description",
          category: "Sample Category",
          date: new Date(),
          schedule_title: "Sample Title",
        },
      ],
    };
    (pool.query as jest.Mock).mockResolvedValue(mockSchedule);

    const result = await getEventSchedule(1);
    expect(result).toEqual([
      {
        id: 1,
        description: "Sample Description",
        category: "Sample Category",
        date: expect.any(Date),
        href: "",
        title: "Sample Title",
      },
    ]);
  });

  test("getModels should return an array of models", async () => {
    const mockUsers = {
      rows: [
        {
          id: 2,
          countryCode: "US",
          username: "model1",
          profileUrl: "http://example.com/profile2",
          city: "City2",
          name: "Model One",
          email: "model1@example.com",
          country: "Country2",
          role: "model",
          phone: "0987654321",
        },
      ],
    };
    (pool.query as jest.Mock).mockResolvedValue(mockUsers);

    const result = await getModels(1);
    expect(result).toEqual([
      {
        id: 2,
        countryCode: "US",
        username: "model1",
        profileUrl: "http://example.com/profile2",
        city: "City2",
        name: "Model One",
        email: "model1@example.com",
        country: "Country2",
        role: "model",
        phone: "0987654321",
      },
    ]);
  });

  test("getEvent should return event data", async () => {
    const mockEventInfo = {
      rows: [
        {
          description: "Event Description",
          slug: "event-slug",
          terms: "Event Terms",
        },
      ],
    };
    (pool.query as jest.Mock).mockResolvedValueOnce(mockEventInfo);
    (pool.query as jest.Mock).mockResolvedValueOnce({
      rows: [],
    });
    (pool.query as jest.Mock).mockResolvedValueOnce({
      rows: [],
    });
    (pool.query as jest.Mock).mockResolvedValueOnce({
      rows: [],
    });
    (pool.query as jest.Mock).mockResolvedValueOnce({
      rows: [],
    });

    const result = await getEvent(1);
    expect(result).toEqual({
      models: [],
      eventSchedule: [],
      description: "Event Description",
      slug: "event-slug",
      terms: "Event Terms",
      organizers: [],
      location: undefined,
    });
  });

  test("getEventFormData should return event form data", async () => {
    // Mock data for getEventFormData
    const mockData = {
      endDate: new Date(),
      description: "Event Description",
      location: "Sample Location",
      startDate: new Date(),
      images: ["image1.jpg"],
      models: [{ name: "Model One", id: "1", profileImage: "model1.jpg" }],
      photographers: [
        {
          name: "Photographer One",
          id: "1",
          profileImage: "photographer1.jpg",
        },
      ],
      organizers: [
        {
          name: "Organizer One",
          id: "1",
          profileImage: "organizer1.jpg",
        },
      ],
      schedule: [
        {
          title: "Sample Schedule",
          date: new Date(),
          location: "Sample Location",
          price: "100",
        },
      ],
      prices: [
        {
          option: "VIP",
          price: "200",
          startDate: new Date(),
          endDate: new Date(),
        },
      ],
      terms: "Event Terms",
    };

    // Mock the necessary functions to return the mock data
    (getEvent as jest.Mock).mockResolvedValue(mockData);

    const result = await getEventFormData(1);
    expect(result).toEqual(mockData);
  });
});
