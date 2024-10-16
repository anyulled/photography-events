import {faker} from "@faker-js/faker";
import pool from "@/lib/db"
import {getAlpha2Code} from "i18n-iso-countries"

export async function GET(request: Request) {
    pool.query("BEGIN");
    pool.query("TRUNCATE TABLE event_registrations");
    pool.query("TRUNCATE TABLE event_participants");
    pool.query("TRUNCATE TABLE event_schedule");
    pool.query("TRUNCATE TABLE events");
    pool.query("TRUNCATE TABLE availability");
    pool.query("COMMIT");
    const users = await pool.query("select * from users");
    users.rows.forEach(user => {
        const currentDate = faker.date.soon({days: 10});
        const country = faker.location.country();
        pool.query("INSERT INTO availability (user_id, available_from, available_to, city, country, country_code) VALUES ($1, $2, $3, $4, $5, $6)", [
            user.id,
            currentDate,
            faker.date.soon({days: 3, refDate: currentDate}),
            faker.location.city(),
            country,
            getAlpha2Code(country, "en")
        ]);
    });


    return new Response("Operation succeeded");
}