import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");

    if (!code) {
        return NextResponse.json({ error: "Missing code from Tesla" }, { status: 400 });
    }

    const tokenURL = "https://auth.tesla.com/oauth2/v3/token";

    const body = {
        grant_type: "authorization_code",
        client_id: "ownerapi",
        code,
        redirect_uri: "https://tesla-roast-app.vercel.app/api/auth/callback",
    };

    const response = await fetch(tokenURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    const date = await response.json();

    return NextResponse.json(date);
}
