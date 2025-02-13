import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function GET() {
    try {
        const fetchImages = await prisma.image.findMany()
        return new NextResponse(JSON.stringify(fetchImages), {
            status: 200,
            headers: { "Content-Type": "application/json" }
          });
      
        } catch (error) {
          console.error("Fetch images error:", error);
          return new NextResponse(JSON.stringify({ error: "Failed to fetch images" }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
          });
        }
      }