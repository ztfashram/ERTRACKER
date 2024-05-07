import { CreateRequestForm } from "@/app/new-request/create-request-form";
import { Separator } from "@/components/ui/separator";

export default function NewRequestPage() {
    return (
        <div className="flex flex-col items-center justify-center space-y-6">
            <div className="">
                <h3 className="text-lg font-medium pt-4">
                    Create a new engineering request
                </h3>
                <p className="text-sm text-muted-foreground">
                    Describe existing problem or expectations:
                </p>
            </div>
            <Separator className="w-[600px]" />
            <CreateRequestForm />
        </div>
    );
}
