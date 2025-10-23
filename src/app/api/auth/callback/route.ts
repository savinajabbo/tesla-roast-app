import { NextResponse } from "next/server";

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
    const audience = "https://fleet-api.prd.na.vn.cloud.tesla.com";

    if (!clientSecret) {
        console.error("missing TESLA_CLIENT_SECRET in environment variables :(");
        return NextResponse.json({ error: "missing tesla client secret on server" }, { status: 500 });
    }

    const scope = "openid email offline_access vehicle_device_data vehicle_cmds vehicle_charging_cmds";

    const body = {
        grant_type: "authorization_code",
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: redirectUri,
        audience,
        scope,
    };

    const response = await fetch(tokenURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });
    

    const data = await response.json();
    console.log("tesla token exchange response: ", data);

    if (data.error) {
        return NextResponse.json({ error: data.error, details: data}, { status: 400 });
    }

    const res = NextResponse.redirect("https://tesla-roast-app.vercel.app/dashboard");
    res.cookies.set("tesla_access_token", data.access_token, {
        httpOnly: true,
        secure: true,
        path: "/",
        maxAge: 60 * 60,
    });

    return res;
}
