import ReusableLogo from "./utils/ReusableLogo";

export default function Home() {
    return (
        <main className="flex flex-col justify-center items-center h-96">
            <p className="text-6xl font-bold">
                Welcome to{" "}
                <span className="font-bold">
                    <ReusableLogo valo="Valo" search="Search" isLargeText={true} />
                </span>
            </p>
            <span>
                Your go-to <span className="text-red-500">hub</span> for exploring all aspects of the Valorant gaming
                experience.
            </span>
        </main>
    );
}
