import Link from "next/link";
import Logo from "/public/img/logo.svg";
import ThemeToggleButton from "@/components/ui/ThemeToggleButton";

const Navbar = ({ siteTitle, items, menuOpen, setMenuOpen }) => {
    const color = menuOpen ? "background" : "foreground";

    return (
        <div className="flex justify-between items-center sticky top-0">
            {/*  LEFT  */}
            <div className="flex items-center self-start">
                <Link>
                    <Logo className={`w-12 h-12 fill-${color}`} />
                    <button className={`text-lg text-${color}`}>{siteTitle}</button>
                </Link>
            </div>

            {/*  CENTER  */}
            <div>
                <ThemeToggleButton />
            </div>

            {/*  RIGHT  */}
            <div className="flex items-center"></div>
        </div>
    );
};
