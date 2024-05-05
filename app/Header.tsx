"use client";

import { useUser } from "@clerk/nextjs";
import { Button } from "../components/ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

const Header = () => {
    const { theme, setTheme } = useTheme();
    const { user } = useUser();
    const formatedUsername = user?.username
        ? user?.username?.charAt(0).toUpperCase() + user?.username?.slice(1)
        : "Anonymous";

    const handleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };
    return (
        <div className="sticky inset-x-0 top-0 z-30 transition-all backdrop-blur border-b border-gray-200 h-16 flex items-center justify-between w-full ">
            <div className="ml-4 font-bold">Welcome {formatedUsername}</div>
            <div className="mr-4">
                <Button variant="outline" size="icon" onClick={handleTheme}>
                    <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle Theme</span>
                </Button>
            </div>
        </div>
    );
};

export default Header;
