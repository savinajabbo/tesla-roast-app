import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return NextResponse.json(
      { error: "Missing authorization code" },
      { status: 400 }
    );
  }

  try {
    // exchange the code for an access token
    const tokenRes = await fetch("https://auth.tesla.com/oauth2/v3/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: process.env.TESLA_CLIENT_ID!,
        client_secret: process.env.TESLA_CLIENT_SECRET!,
        redirect_uri: process.env.TESLA_REDIRECT_URI!,
        code,
      }),
    });

    const tokenData = await tokenRes.json();

    if (!tokenRes.ok) {
      console.error("Token exchange failed:", tokenData);
      return NextResponse.json(
        { error: "Token exchange failed", details: tokenData },
        { status: tokenRes.status }
      );
    }

    // save token in cookie (or session)
    const response = NextResponse.redirect(new URL("/dashboard", req.url));
    response.cookies.set({
      name: "tesla_access_token",
      value: tokenData.access_token,
      path: "/",
      httpOnly: true,
      secure: true,
      maxAge: tokenData.expires_in,
    });

    return response;
  } catch (err) {
    console.error("Callback error:", err);
    return NextResponse.json(
      { error: "OAuth callback failed", details: err },
      { status: 500 }
    );
  }
}
