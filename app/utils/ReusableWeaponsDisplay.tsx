import { WeaponProps } from "@/lib/WeaponProps";
import Image from "next/image";

type CategoryWeaponsProps = {
    loading: boolean;
    length: number;
    loadingResizer: boolean;
    rowTitle: string;
    categoryName: string;
    getWeapons: WeaponProps[];
    handleChooseWeapon: (uuid: string) => void;
    padding: boolean;
    height: boolean;
    resizable: boolean;
};

export default function ReusableWeaponsDisplay({
    loading,
    length,
    loadingResizer,
    rowTitle,
    categoryName,
    getWeapons,
    handleChooseWeapon,
    padding,
    height,
    resizable,
}: CategoryWeaponsProps) {
    return (
        <>
            <p className="text-center bg-green-400/60 border-b-2 border-white">{rowTitle}</p>
            {/* DISPLAYING THE SIDEARM */}
            <div className="flex flex-col gap-1 mt-1 mb-4">
                {loading &&
                    Array.from({ length: length }).map((_, index) => (
                        <div
                            key={index}
                            className="w-full flex border-2 border-white animate-pulse"
                        >
                            <div
                                className={`${
                                    loadingResizer ? "w-full h-[88px]" : "w-[2408px] h-[115px]"
                                } bg-slate-50/20`}
                            ></div>
                        </div>
                    ))}
                {!loading &&
                    getWeapons
                        // FIX THE CATEGORY NAME FOR THE REUSABLE COMPONENT
                        ?.filter(({ category }: WeaponProps) => category === categoryName)
                        .sort(
                            (a: WeaponProps, b: WeaponProps) =>
                                (a.shopData?.cost || 0) - (b.shopData?.cost || 0)
                        )
                        .map(({ uuid, displayName, shopData }) => (
                            <button
                                key={uuid}
                                onClick={() => handleChooseWeapon(uuid as string)}
                                className={`${padding ? "pt-3" : "pt-10"} ${
                                    height ? "" : "h-24"
                                } px-3 pb-2 bg-slate-50/20 border-2 border-transparent hover:border-2 hover:border-green-300 hover:bg-green-300/50`}
                            >
                                {shopData?.newImage && (
                                    <Image
                                        src={shopData?.newImage}
                                        alt={`${displayName}'s Image`}
                                        width={500}
                                        height={500}
                                        sizes="100vw"
                                        priority
                                        className={`${
                                            resizable ? "w-auto h-10 px-2" : "w-auto h-10 px-2"
                                        } mx-auto`}
                                    />
                                )}
                                <p className="text-start leading-tight">{shopData?.cost}</p>
                                <p className="text-start">{displayName}</p>
                            </button>
                        ))}
            </div>
        </>
    );
}
