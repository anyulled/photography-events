import pool from "@/lib/db";

import {EventData, EventDay, Update, UserProfile} from "@/lib/types";
import {TravelNotice} from "@/services/personService";

export const getLocationInfo = async (
    id: number,
): Promise<EventData["location"]> => {
    return await pool.query("SELECT * FROM locations WHERE id = $1", [id]).then(
        (value) =>
            ({
                city: value.rows[0].city,
                country: value.rows[0].country,
                latitude: value.rows[0].latitude,
                longitude: value.rows[0].longitude,
                state: value.rows[0].state,
                street: value.rows[0].street,
                zipCode: value.rows[0].zip_code,
            }) as EventData["location"],
    );
};

export const getOrganizers = async (
    eventId: number,
): Promise<Array<UserProfile>> => {
    return await pool
        .query(
            "SELECT * FROM users u inner join event_participants ep on u.id = ep.user_id WHERE event_id = $1 and u.role = 'organizer'",
            [eventId],
        )
        .then((value) =>
            value.rows.map((user) => ({
                id: user.id,
                countryCode: user.countryCode,
                username: user.username,
                profileUrl: user.profileUrl,
                city: user.city,
                name: user.name,
                email: user.email,
                country: user.country,
                role: user.role,
                phone: user.phone,
            })),
        );
};

export const getEventSchedule = async (
    eventId: number,
): Promise<Array<EventDay>> => {
    return await pool
        .query("SELECT * FROM event_schedule es WHERE es.id = $1", [eventId])
        .then((value) =>
            value.rows.map((event) => ({
                id: event.id,
                description: event.schedule_description,
                category: event.category,
                date: event.date,
                href: "",
                title: event.schedule_title,
            })),
        );
};

export const getModels = async (
    eventId: number,
): Promise<Array<UserProfile>> => {
    return await pool
        .query(
            "SELECT * FROM users u inner join event_participants ep on u.id = ep.user_id WHERE event_id = $1 and u.role = 'model'",
            [eventId],
        )
        .then((value) =>
            value.rows.map((user) => ({
                id: user.id,
                countryCode: user.countryCode,
                username: user.username,
                profileUrl: user.profileUrl,
                city: user.city,
                name: user.name,
                email: user.email,
                country: user.country,
                role: user.role,
                phone: user.phone,
            })),
        );
};

export const getEvent = async (eventId: number): Promise<EventData> => {
    const eventInfo = await pool.query(
        "SELECT * FROM events e inner join public.event_participants ep on  e.id = ep.event_id WHERE e.id = $1",
        [eventId],
    );

    return {
        models: await getModels(eventId),
        eventSchedule: await getEventSchedule(eventId),
        description: eventInfo.rows[0].description,
        slug: eventInfo.rows[0].slug,
        terms: eventInfo.rows[0].terms,
        organizers: await getOrganizers(eventId),
        location: await getLocationInfo(eventId),
    } as EventData;
};

export const getEventFormData = async (
    eventId: number,
): Promise<{
    endDate: Date;
    description: string;
    location: string;
    startDate: Date;
    images: string[];
    models: Array<{ name: string; id: string; profileImage: string }>;
    photographers: Array<{ name: string; id: string; profileImage: string }>;
    organizers: Array<{ name: string; id: string; profileImage: string }>;
    schedule: Array<{
        title: string;
        date: Date | undefined;
        location: string;
        price: string;
    }>;
    prices: Array<{
        option: string;
        price: string;
        startDate: Date | undefined;
        endDate: Date | undefined;
    }>;
    terms: string;
}> => ({
    description: "" + eventId,
    location: "",
    startDate: new Date(),
    endDate: new Date(),
    images: [],
    models: [],
    photographers: [],
    organizers: [],
    schedule: [],
    prices: [],
    terms: "",
});

export const getEventsHome = async (userLocation?: GeolocationPosition | undefined): Promise<Array<TravelNotice>> => {

    if (userLocation) {
        console.log("user location", userLocation);
    }

    const availability = await pool.query<TravelNotice>(`select a.id,
                                                                ''             as href,
                                                                a.country,
                                                                city,
                                                                u.username,
                                                                a.country_code as "countryCode",
                                                                'available'    as title,
                                                                available_from as "startDate",
                                                                available_to   as "endDate",
                                                                'model'
                                                         from availability a
                                                                  inner join public.users u on u.id = a.user_id`);

    return availability.rows;
}

export const getUpdateFeed = async (): Promise<Array<Update>> => {
    const result = await pool.query(`select u.role,
                                            u.name,
                                            u.username,
                                            ul.url,
                                            u.profile_image  as imageUrl,
                                            a.city,
                                            a.country,
                                            a.available_from as dateStart,
                                            a.available_to   as dateEnd,
                                            u.role           as type
                                     from availability a
                                              inner join users u on u.id = a.user_id
                                              left outer join user_links ul on u.id = ul.user_id
                                     where ul.title = 'instagram'
                                        or ul.title is null
    `);

    return result.rows.map(update => ({
        user: {
            name: update.name,
            role: update.type,
            instagram: update.url,
            username: update.username
        },
        type: `${update.type} Availability`,
        imageUrl: update.imageUrl,
        city: update.city,
        country: update.country,
        dateStart: update.dateStart,
        dateEnd: update.dateEnd
    }));
}