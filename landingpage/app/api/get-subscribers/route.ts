import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { decryptEmail } from "../../../utils/encryption";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const subscribers: { email: string }[] = await prisma.subscriber.findMany();

    const emails = subscribers.map(subscriber => decryptEmail(subscriber.email));

    return NextResponse.json({ success: true, emails });
  } catch (error) {
    console.error("Subscription error:", error);
    return NextResponse.json({ error: "Failed to retrieve emails" }, { status: 500 });
  }
}
