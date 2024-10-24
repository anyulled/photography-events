import {NextRequest, NextResponse} from "next/server";

export const GET = (request: NextRequest): void | Response | Promise<void | Response> => {
    const mapsApiKey = process.env.GOOGLE_MAP_API_KEY;
    const latitude = request.nextUrl.searchParams.get("latitude");
    const longitude = request.nextUrl.searchParams.get("longitude");

    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${mapsApiKey}`)
        .then(value => value.json())
        .then(value => console.log(value))
        .catch(reason => console.log(reason))
        .finally(() => console.log("done"));

    console.log("request", request);
    return NextResponse.json({city:"Spain"});
};