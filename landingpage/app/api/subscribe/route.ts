import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { encryptEmail } from "../../utils/encryption";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: "Email is required" }, { status: 400 });

    const encryptedEmail = encryptEmail(email);

    await prisma.subscriber.create({
      data: { email: encryptedEmail },
    });

    return NextResponse.json({ success: true, message: "Email subscribed successfully!" });
  } catch (error) {
    console.log("Subscription error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}