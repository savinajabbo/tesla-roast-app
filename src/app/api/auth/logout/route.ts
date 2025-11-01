/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const res = NextResponse.json({ message: "logged out"});

    res.cookies.set("tesla_access_token", "", {
        httpOnly: true,
        secure: true,
        path: "/",
        maxAge: 0,
    });

    return res;
}