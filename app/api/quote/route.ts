import { NextResponse } from "next/server";
import { quoteSchema } from "@/lib/validations/quote";
import { sendEmail } from "@/lib/email";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(request: Request) {
  // Basic throttling per IP.
  const ip = getClientIp(request);
  const { ok } = rateLimit(`quote:${ip}`, { limit: 5, windowMs: 60_000 });
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

  const parsed = quoteSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form and try again.", issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const data = parsed.data;

  // Honeypot: if the hidden field is filled, silently accept without processing.
  if (data.company) {
    return NextResponse.json({ ok: true });
  }

  const text = [
    `New quote request from the website`,
    `----------------------------------`,
    `Name: ${data.fullName}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Address: ${data.address || "—"}`,
    `City: ${data.city}`,
    `Service: ${data.service}`,
    `Property type: ${data.propertyType}`,
    `Preferred contact: ${data.contactMethod}`,
    `Budget: ${data.budget || "—"}`,
    `Preferred start: ${data.startDate || "—"}`,
    ``,
    `Project description:`,
    data.message,
  ].join("\n");

  const { delivered } = await sendEmail({
    subject: `New Quote Request — ${data.service} (${data.city})`,
    text,
    replyTo: data.email,
  });

  return NextResponse.json({ ok: true, delivered });
}
