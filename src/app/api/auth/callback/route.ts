import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  if (!code) {
    return NextResponse.json({ error: "missing code" }, { status: 400 });
  }

  if (!state) {
    // optionally validate CSRF state?
    console.warn("missing state param");
  }

  const clientId = process.env.TESLA_CLIENT_ID!;
  const clientSecret = process.env.TESLA_CLIENT_SECRET!;
  const redirectUri = process.env.TESLA_REDIRECT_URI!;
  const audience = "https://fleet-api.prd.na.vn.cloud.tesla.com";

  try {
    const form = new URLSearchParams({
      grant_type: "authorization_code",
      client_id: clientId,
      client_secret: clientSecret,
      code: code,
      redirect_uri: redirectUri,
      audience: audience,
    });

    const tokenRes = await fetch(
      "https://fleet-auth.prd.vn.cloud.tesla.com/oauth2/v3/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: form.toString(),
      }
    );

    const tokenData = await tokenRes.json();

    if (!tokenRes.ok) {
      console.error("tesla oauth token error:", tokenData);
      return NextResponse.json({ error: "token exchange failed", details: tokenData }, { status: 500 });
    }

    const accessToken = tokenData.access_token;
    const refreshToken = tokenData.refresh_token;

    // set cookies securely
    const res = NextResponse.redirect(new URL("/dashboard", req.url));
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: tokenData.expires_in ?? 3600,
    };
    res.cookies.set("tesla_access_token", accessToken, cookieOptions);
    if (refreshToken) {
      res.cookies.set("tesla_refresh_token", refreshToken, {
        ...cookieOptions,
        maxAge: 60 * 60 * 24 * 30,
      });
    }

    return res;
  } catch (error) {
    console.error("unexpected callback error:", error);
    return NextResponse.json({ error: "internal error" }, { status: 500 });
  }
}