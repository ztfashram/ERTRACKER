export type RequestType = {
    id: string;
    requesterId: string;
    title: string;
    customer?: string | null;
    description?: string | null;
    type: Type_of_Request;
    isCompleted: boolean;
    createdAt: Date;
    updatedAt: Date;
};

enum Type_of_Request {
    Manufacturing_Drawing = "Manufacturing_Drawing",
    Basic_Drawing = "Basic_Drawing",
    Technical_Enquiry = "Technical_Enquiry",
    Drawing_Update = "Drawing_Update",
    Other = "Other",
}
