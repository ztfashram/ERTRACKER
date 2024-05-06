"use client";

import { ColumnDef } from "@tanstack/react-table";
import { RequestSchema } from "@/app/validationSchema";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type EnrichedRequests = RequestSchema & { username: string };

export const columns: ColumnDef<EnrichedRequests>[] = [
    {
        accessorKey: "title",
        header: "Title",
    },
    {
        accessorKey: "customer",
        header: "Customer",
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => (
            <div className="truncate ">{row.getValue("description")}</div>
        ),
    },
    {
        accessorKey: "type",
        header: "Type",
    },
    {
        accessorKey: "isCompleted",
        header: "Is Completed",
    },
    {
        accessorKey: "username",
        header: "Requester",
        cell: ({ row }) => (
            <div className="">
                {(row.getValue("username") as string).charAt(0).toUpperCase() +
                    (row.getValue("username") as string).slice(1)}
            </div>
        ),
    },
    {
        accessorKey: "createdAt",
        header: () => <div className="text-right">Created At</div>,
        cell: ({ row }) => {
            const date = row.getValue("createdAt");
            const formattedDate = new Date(date as string).toLocaleDateString(
                "en-AU"
            );

            return (
                <div className="text-right font-medium">{formattedDate}</div>
            );
        },
    },
    {
        accessorKey: "updatedAt",
        header: () => <div className="text-right">Updated At</div>,
        cell: ({ row }) => {
            const date = row.getValue("updatedAt");
            const formattedDate = new Date(date as string).toLocaleDateString(
                "en-AU"
            );

            return (
                <div className="text-right font-medium">{formattedDate}</div>
            );
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const payment = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => null}>
                            Copy payment ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>
                            View payment details
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
