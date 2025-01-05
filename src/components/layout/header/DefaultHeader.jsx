"use client";

import NavMobileMenu from "@/components/nav/mobile/NavMobileMenu";
import Navbar from "@/components/nav/Navbar";

import { cn } from "@/utils";
import { useNavbarStore } from "@/hooks/useNavbarStore";

const items = [
    { link: "/about", label: "About" },
    { link: "/", label: "Shows" },
    { link: "/works", label: "Works" },
    { link: "/", label: "Projects" },
    { link: "/", label: "Case Studies" },
];

const Header = ({ title, children }) => {
    const { isOpen, setIsOpen } = useNavbarStore();

    return (
        <>
            {isOpen && <NavMobileMenu onClick={() => setIsOpen(false)} items={items} />}
            <header className={cn("px-8 pt-4 pb-4 flex flex-col duration-300 z-30")}>
                <Navbar menuOpen={isOpen} setMenuOpen={setIsOpen} siteTitle={title} items={items} />
                {children && <div className="pt-4">{children}</div>}
            </header>
        </>
    );
};

export default Header;
