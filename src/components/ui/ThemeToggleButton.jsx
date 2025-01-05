"use client";

import { useTheme } from "next-themes";

import { useEffect, useState } from "react";

const ThemeToggleButton = () => {
    const [isMounted, setIsMounted] = useState(false);
    const { setTheme } = useTheme();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const toggleTheme = () => setTheme((theme) => (theme === "dark" ? "light" : "dark"));

    return (
        isMounted && (
            <button type="button" onClick={toggleTheme} className="flex">
                <div className="i-lucide-moon hover:text-amber-500 hover:i-lucide-moon-star absolute scale-0 dark:scale-100 transform duration-300 rotate-90 dark:rotate-0" />
                <div className="i-lucide-sun hover:text-amber-500 scale-100 dark:scale-0 transform duration-300 rotate-0 dark:-rotate-90" />
                <span className="sr-only">Toggle theme</span>
            </button>
        )
    );
};

export default ThemeToggleButton;
