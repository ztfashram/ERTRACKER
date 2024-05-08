import prisma from "@/prisma/client";
import RequestsTable from "./requests-table";
import { columns } from "./columns";
import { RequestSchema } from "../validationSchema";
import { getUsernames } from "@/utils/getUsernames";
import AddRequestButton from "./add-request-button";

async function getRequests() {
    try {
        const requests = await prisma.request.findMany({
            orderBy: { createdAt: "desc" },
        });
        return requests;
    } catch (error) {
        console.error(error);
        return [];
    }
}

async function loader() {
    const requests = await getRequests();
    const userIds = requests.map((req) => req.requesterId);
    const userMap = await getUsernames(userIds);

    const enrichedRequests = requests.map((request) => ({
        ...request,
        username: userMap.find((user) => user.userId === request.requesterId)!
            .username,
    }));

    return enrichedRequests;
}

export default async function RequestsPage() {
    const enrichedRequests = await loader();

    return (
        <div className="space-y-6 p-8">
            <div className="flex justify-between items-center w-full">
                <div className="flex-grow flex justify-center text-2xl font-bold">
                    Engineering Requests
                </div>
                <AddRequestButton />
            </div>
            {enrichedRequests && (
                <RequestsTable columns={columns} data={enrichedRequests} />
            )}
        </div>
    );
}
