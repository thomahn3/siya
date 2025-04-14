import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: "Email is required" }, { status: 400 });

    await prisma.subscriber.create({
      data: { email: email },
    });

    return NextResponse.json({ success: true, message: "Email subscribed successfully!" });
  } catch (error) {
    console.log("Subscription error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}