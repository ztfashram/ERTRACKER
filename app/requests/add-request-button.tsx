"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function AddRequestButton() {
    const router = useRouter();
    return (
        <Button onClick={() => router.push("/new-request")}>New Request</Button>
    );
}
