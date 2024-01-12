interface ReusableLogoProps {
    valo: string;
    search: string;
    isLargeText?: boolean
}

export default function ReusableLogo({ valo, search, isLargeText }: ReusableLogoProps) {
    return (
        <>
            <span className={`text-red-500 ${isLargeText ? "text-6xl" : "text-4xl"}`}>{valo}</span>
            <span className={`${isLargeText ? "text-6xl" : "text-2xl"}`}>{search}</span>
        </>
    );
}
