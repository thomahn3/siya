import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const count = await prisma.subscriber.count();
    return NextResponse.json({ count });
  } catch (error) {
    console.error("Error fetching subscriber count:", error);
    return NextResponse.json({ error: "Internal Server Error" });
  }
}
