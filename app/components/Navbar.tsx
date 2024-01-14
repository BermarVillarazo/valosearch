"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ReusableLogo from "../utils/ReusableLogo";

export default function Navbar() {
    const pathname = usePathname();

    const links = [
        { href: "/", label: "Home" },
        { href: "/agents", label: "Agents" },
        { href: "/maps", label: "Maps" },
        { href: "/weapons", label: "Weapons" },
    ];

    return (
        <nav className="flex my-5 px-20 max-lg:w-[1000px]">
            <Link href={"/"} className="font-bold" title="Back to homepage? 🙂">
                <ReusableLogo valo="Valo" search="Search" isLargeText={false} />
            </Link>
            <div className="flex justify-center items-center gap-10 text-lg font-semibold ml-auto">
                {links.map(({ href, label }) => (
                    <Link
                        key={href}
                        href={href}
                        className={`${
                            pathname === href ? "text-red-500" : ""
                        } hover:text-red-500 ease-in-ou duration-300`}
                        as={href}
                    >
                        {label}
                    </Link>
                ))}
            </div>
        </nav>
    );
}
