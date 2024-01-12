import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: {
        default: "ValoSearch",
        template: "%s | ValoSearch",
    },
    description:
        "Unlock the full potential of your Valorant journey with ValoSearch – the premier platform dedicated to seamlessly searching and discovering all things Valorant-related. Dive into a world of comprehensive information, guides, and updates, making ValoSearch your ultimate go-to hub for navigating the Valorant gaming experience. Elevate your play and stay in the know with ValoSearch, where every search brings you closer to mastering Valorant's intricate universe.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Navbar />
                <article className="w-[1000px] mx-auto">{children}</article>
            </body>
        </html>
    );
}
