import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { userId } = auth();
        const { id } = params;

        if (!userId) {
            return NextResponse.json(
                { error: "Unauthrozied" },
                { status: 401 }
            );
        }
        const task = await prisma.request.delete({
            where: { id },
        });
        console.log(id);

        return NextResponse.json(task, { status: 201 });
    } catch (error) {
        console.error("failed to delete request:", error);
        return NextResponse.json(
            { error: "Failed to delete request" },
            { status: 500 }
        );
    }
}
