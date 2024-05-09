"use server";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

export async function deleteRequest(id: string) {
    const request = await prisma.request.delete({
        where: { id },
    });
    if (request === null) {
        return notFound();
    }
}
