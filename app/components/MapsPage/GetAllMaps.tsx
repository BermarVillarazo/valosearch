"use client";

import { MapProps } from "@/lib/MapProps";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function GetAllMaps() {
    const [maps, setMaps] = useState<MapProps[] | null>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedMap, setSelectedMap] = useState<MapProps[] | null>([]);
    const [showMiniMap, setShowMiniMap] = useState<boolean>(false);

    async function fetchMaps() {
        const res = await axios.get("https://valorant-api.com/v1/maps");
        const data = res.data.data;
        setMaps(data);
        setLoading(false);
    }

    useEffect(() => {
        fetchMaps();
    }, []);

    function handleChooseMap(uuid: string) {
        setShowMiniMap(false);
        const selectedMap = maps?.filter((map) => map.uuid === uuid);
        setSelectedMap(selectedMap ?? null);
    }

    function handleShowMiniMap() {
        setShowMiniMap(!showMiniMap);
    }

    return (
        <div className="flex flex-col justify-between items-center gap-10 h-full pb-5">
            <div className="flex justify-center items-center flex-wrap gap-5">
                {/* DISPLAYING THE SKELETON WHILE FETCHING THE MAPS */}
                {loading &&
                    Array.from({ length: 15 }).map((_, index) => (
                        <div key={index} className="flex border-2 border-white animate-pulse">
                            <div className="w-[225px] h-[45px] bg-slate-50/20"></div>
                        </div>
                    ))}

                {/* DISPLAYING THE SMALL MAPS */}
                {maps?.map(({ uuid, displayName, listViewIcon }) => (
                    <button
                        key={uuid}
                        className="relative"
                        onClick={() => handleChooseMap(uuid as string)}
                    >
                        <div>
                            {listViewIcon && (
                                <Image
                                    src={listViewIcon}
                                    alt={`${displayName}'s Image`}
                                    width={200}
                                    height={200}
                                    quality={100}
                                    sizes="100vw"
                                    priority
                                    className="w-[228px] h-[50px]"
                                />
                            )}
                        </div>
                        <div className="absolute top-0 w-full h-[100%] hover:bg-slate-100/70 hover:animate-pulse">
                            <p className="w-full h-[100%] flex justify-center items-center text-2xl text-black font-bold opacity-0 hover:opacity-100 ease-in-out duration-300">
                                {displayName}
                            </p>
                        </div>
                    </button>
                ))}
            </div>

            <div className="w-full h-full flex flex-col justify-center">
                {selectedMap?.map(({ uuid, displayName, splash }) => (
                    <div key={uuid}>
                        <div className="text-center mb-10">
                            <button
                                onClick={handleShowMiniMap}
                                className="bg-red-500 py-3 px-6 font-medium text-lg hover:animate-pulse hover:rounded-tl-xl hover:rounded-br-xl ease-in-out duration-300"
                            >
                                {showMiniMap ? "Hide minimap" : "Show minimap"}
                            </button>
                        </div>

                        {showMiniMap &&
                            (selectedMap?.[0]?.displayIcon ? (
                                <Image
                                    src={selectedMap?.[0]?.displayIcon}
                                    alt={`${displayName}'s Image`}
                                    width={500}
                                    height={500}
                                    quality={100}
                                    sizes="100vw"
                                    priority
                                    className="w-full h-full"
                                />
                            ) : (
                                <p className="py-52 text-center text-3xl font-bold">
                                    No Minimap for{" "}
                                    <span className="text-red-500">{displayName}</span>
                                </p>
                            ))}

                        {/* DISPLAY THE MAP */}
                        {splash && (
                            <Image
                                src={splash}
                                alt={`${displayName}'s Image`}
                                width={500}
                                height={500}
                                quality={100}
                                sizes="100vw"
                                priority
                                className="w-full h-full"
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
