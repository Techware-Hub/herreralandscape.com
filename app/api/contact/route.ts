import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations/contact";
import { sendEmail } from "@/lib/email";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const { ok } = rateLimit(`contact:${ip}`, { limit: 5, windowMs: 60_000 });
  if (!ok) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment and try again." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form and try again.", issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const data = parsed.data;

  // Honeypot check.
  if (data.company) {
    return NextResponse.json({ ok: true });
  }

  const text = [
    `New contact message from the website`,
    `------------------------------------`,
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || "—"}`,
    `Subject: ${data.subject}`,
    ``,
    `Message:`,
    data.message,
  ].join("\n");

  const { delivered } = await sendEmail({
    subject: `New Contact Message — ${data.subject}`,
    text,
    replyTo: data.email,
  });

  return NextResponse.json({ ok: true, delivered });
}
