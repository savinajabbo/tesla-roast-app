import { responseCookiesToRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { NextResponse } from "next/server";
console.log("TESLA_CLIENT_SECRET loaded?", !!process.env.TESLA_CLIENT_SECRET);

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");

    if (!code) {
        return NextResponse.json({ error: "missing code from tesla" }, { status: 400 });
    }

    const tokenURL = "https://auth.tesla.com/oauth2/v3/token";
    const clientId = "0781fc62-6073-459e-84ca-ab343e1699fa";
    const clientSecret = process.env.TESLA_CLIENT_SECRET;
    const redirectUri = "https://tesla-roast-app.vercel.app/api/auth/callback";

    if (!clientSecret) {
        console.error("missing TESLA_CLIENT_SECRET in environment variables :(");
        return NextResponse.json({ error: "missing tesla client secret on server" }, { status: 500 });
    }

    const body = {
        grant_type: "authorization_code",
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: redirectUri,
    };

    const response = await fetch(tokenURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });
    
    const text = await response.text();

    if (text.trim().startsWith("<")) {
        console.error("tesla returned HTML instead of JSON LOL: ", text.slice(0, 200));
        return NextResponse.json({error: "tesla returned HTML instead of JSON"}, { status: 500 });
    }

    const firstChar = text.trim().charAt(0);
    if (firstChar !== "{" && firstChar !== "[") {
        console.error("invalid tesla response: ", text);
        return NextResponse.json({ error: "invalid tesla response" }, {status: 500});
    }

    const data = JSON.parse(text);
    console.log("tesla token exchange response: ", data);

    if (data.error) {
        console.error("tesla error: ", data);
        return NextResponse.json({ error: data.error, details: data}, { status: 400 });
    }

    return NextResponse.redirect("https://tesla-roast-app.vercel.app/dashboard");
}