import {NextRequest, NextResponse} from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const width = searchParams.get("width") || "200";
    const height = searchParams.get("height") || "200";

    const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#cccccc"/>
      <text x="50%" y="50%" font-family="Arial" font-size="24" fill="#ffffff" text-anchor="middle" dy=".3em">${width}x${height}</text>
    </svg>
  `;

    return new NextResponse(svg, {
        headers: {"Content-Type": "image/svg+xml",
            'Cache-Control': 'public, s-maxage=3600',
            'CDN-Cache-Control': 'public, s-maxage=3600',
            'Vercel-CDN-Cache-Control': 'public, s-maxage=3600',
        },
    });
}
