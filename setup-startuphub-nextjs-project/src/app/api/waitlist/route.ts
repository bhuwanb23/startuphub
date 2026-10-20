import { NextResponse } from "next/server";
import { db } from "@/db";
import { waitlist } from "@/db/schema";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string };
    const email = body.email?.trim().toLowerCase();

    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json(
        { ok: false, message: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    await db
      .insert(waitlist)
      .values({ email })
      .onConflictDoNothing({ target: waitlist.email });

    return NextResponse.json({
      ok: true,
      message: "You're on the list — the ecosystem brief is on its way.",
    });
  } catch (error) {
    console.error("[waitlist] insert failed", error);
    return NextResponse.json(
      { ok: false, message: "Could not save your email. Please try again." },
      { status: 500 },
    );
  }
}
