import {faker} from "@faker-js/faker";
import pool from "@/lib/db";
import {QueryResult} from "pg"; //region Types

//region Types

export interface ModelData {
    description: string;
    gender: string;
    events: Array<ModelEvent>;
    links: Array<ModelLink>;
    location: Location;
    name: string;
    photos: string[];
    profileImage: string;
    travelNotices: Array<TravelNotice>;
    username: string;
}

export interface ModelEvent {
    endDate: Date;
    image: string;
    location: Location;
    startDate: Date;
    title: string;
    username: string;
}

export interface Location {
    city: string;
    country: string;
}

export interface TravelNotice {
    username: string;
    city: string;
    country: string;
    countryCode: string;
    startDate: Date;
    endDate: Date;
}

export interface ModelLink {
    name: string;
    url: string;
}

interface EventResult {
    title: string;
    startDate: Date;
    endDate: Date;
    city: string;
    country: string;
    id: number;
}

//endregion

export async function fetchModelData(
    username: string,
): Promise<ModelData | null> {
    try {
        const modelInfo = await pool.query(
            `select u.id
                  , u.name
                  , u.username
                  , u.gender
                  , u.profile_description as description
                  , u.profile_image       as "profileImage"
                  , u.current_city        as city
                  , u.country             as country
             from users u
             where username = $1
             limit 1`,
            [username],
        );

        if (modelInfo.rows.length === 0) throw new Error("User not found");

        const userLinks = await pool.query(
            `
                select title as "name", url
                from user_links
                where user_id = $1
            `,
            [modelInfo.rows[0].id],
        );

        const travelNotices = await pool.query(
            ` select a.city,
                     a.country,
                     a.country_code   as "countryCode",
                     a.available_from as "startDate",
                     a.available_to as "endDate",
                     u.username
              from availability a
                       inner join users u on u.id = a.user_id
              where a.user_id = $1
              order by "startDate"`,
            [modelInfo.rows[0].id],
        );

        const events = await pool.query<EventResult>(
            ` select e.title,
                     e.start_time as "startDate",
                     e.end_time   as "endDate",
                     l.city,
                     l.country,
                     e.title,
                     e.id         as id
              from events e
                       inner join locations l on l.id = e.location_id
              where e.user_id = $1
            `,
            [modelInfo.rows[0].id],
        );

        const modelEvents: ModelEvent[] = events.rows.map(
            ({city, country, ...rest}) => ({
                ...rest,
                image: "",
                location: {city: city, country: country},
            }),
        );

        console.log(`retrieving model with id ${username}`);
        return {
            name: modelInfo.rows[0].name,
            username: modelInfo.rows[0].username,
            gender: modelInfo.rows[0].gender,
            description: modelInfo.rows[0].description,
            profileImage: modelInfo.rows[0].profileImage,
            links: userLinks.rows,
            location: {
                city: modelInfo.rows[0].city,
                country: modelInfo.rows[0].country,
            },
            photos: [
                faker.image.urlLoremFlickr({
                    category: "model",
                    width: 1024,
                    height: 768
                }),
                faker.image.urlLoremFlickr({
                    category: "model",
                    width: 1024,
                    height: 768
                }),
                faker.image.urlLoremFlickr({
                    category: "model",
                    width: 1024,
                    height: 768
                }),
                faker.image.urlLoremFlickr({
                    category: "model",
                    width: 1024,
                    height: 768
                }),
                faker.image.urlLoremFlickr({
                    category: "model",
                    width: 1024,
                    height: 768
                }),
                faker.image.urlLoremFlickr({
                    category: "model",
                    width: 1024,
                    height: 768
                }),
                faker.image.urlLoremFlickr({
                    category: "model",
                    width: 1024,
                    height: 768
                }),
                faker.image.urlLoremFlickr({
                    category: "model",
                    width: 1024,
                    height: 768
                }),
                faker.image.urlLoremFlickr({
                    category: "model",
                    width: 1024,
                    height: 768
                }),
                faker.image.urlLoremFlickr({
                    category: "model",
                    width: 1024,
                    height: 768
                }),
            ],
            events: modelEvents,
            travelNotices: travelNotices.rows,
        };
    } catch (e) {
        console.error(e);
        return null;
    }
}

export type Person = {
    id: number;
    name: string;
    username: string;
    city: string;
    country: string;
    countryCode: string;
    travelNotices: number;
    events: number;
    image: string;
    gender: string;
};

export type UserType = "model" | "photographer" | "organizer";

export async function fetchPersonList(
    userType: UserType = "model",
): Promise<Array<Person>> {
    const result: QueryResult<Person> = await pool.query(
        `select u.id,
                u.name,
                u.current_city  as "city",
                u.country,
                u.username,
                u.profile_image as "image",
                u.country_code  as "countryCode",
                count(a.id)     as "travelNotices",
                count(ep.id)    as "events"
         from users u
                  left join availability a on a.user_id = u.id
                  left join event_participants ep on ep.user_id = u.id
         where u.role = $1
         group by u.id, u.name
         order by u.name`,
        [userType],
    );
    return result.rows;
}
