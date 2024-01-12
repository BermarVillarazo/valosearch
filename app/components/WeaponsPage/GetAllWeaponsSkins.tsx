"use client";

import { WeaponProps } from "@/lib/WeaponProps";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function GetAllWeapons() {
    const [getWeapons, setGetWeapons] = useState<WeaponProps[] | null>([]);

    async function fetchWeapons() {
        const res = await axios.get("https://valorant-api.com/v1/weapons");
        const data = res.data.data;
        setGetWeapons(data);
    }

    console.log(getWeapons);

    useEffect(() => {
        fetchWeapons();
    }, []);

    return (
        <div className="flex flex-col justify-between h-screen py-14">
            <div></div>
            <div className="overflow-auto">
                <div className="flex justify-between w-[3000px] mb-5">
                    {getWeapons?.map(({ uuid, displayIcon, displayName }) => (
                        <div key={uuid} className="">
                            {displayIcon && (
                                <Image
                                    src={displayIcon}
                                    alt={`${displayName}'s Image`}
                                    width={800}
                                    height={800}
                                    sizes="100vw"
                                    priority
                                    className="w-full h-10"
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
