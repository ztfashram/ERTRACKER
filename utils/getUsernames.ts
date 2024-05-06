import { clerkClient } from "@clerk/nextjs/server";

// Function to get username by user ID
async function getUsernames(userIds: string[]) {
    try {
        const userPromises = userIds.map(async (userId) =>
            clerkClient.users.getUser(userId)
        );
        const users = await Promise.all(userPromises);

        return users.map((user) => ({
            userId: user.id,
            username: user.username || "Anonymous",
        }));
    } catch (error) {
        console.error("Failed to fetch username:", error);
        throw error;
    }
}

export { getUsernames };
