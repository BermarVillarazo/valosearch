"use client";

import ReusableDisplayWeaponStats from "@/app/utils/ReusableDisplayWeaponStats";
import ReusableWeaponsDisplay from "@/app/utils/ReusableWeaponsDisplay";
import { WeaponProps } from "@/lib/WeaponProps";
import axios from "axios";
import { useEffect, useState } from "react";

export default function GetAllWeapons() {
    const [getWeapons, setGetWeapons] = useState<WeaponProps[] | null>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedWeapon, setSelectedWeapon] = useState<WeaponProps[] | null>([]);

    async function fetchWeapons() {
        const res = await axios.get("https://valorant-api.com/v1/weapons");
        const data = res.data.data;
        setGetWeapons(data);
        setLoading(false);
    }

    useEffect(() => {
        fetchWeapons();
    }, []);

    const SmgAndShotgunList = getSmgAndShotgunList(getWeapons);
    const SnipersList = getSnipersList(getWeapons);
    const MachineGunsList = getMachineGunsList(getWeapons);

    function handleChooseWeapon(uuid: string) {
        const filterWeapon = getWeapons?.filter((weapon) => weapon.uuid === uuid);
        setSelectedWeapon(filterWeapon ?? null);
    }
    console.log(selectedWeapon);

    return (
        <div className="flex flex-col justify-start pt-4">
            <div className="flex justify-center gap-5">
                {/* SIDEARM ROW */}
                <div className="w-36 text-xs">
                    <ReusableWeaponsDisplay
                        loading={loading}
                        length={5}
                        loadingResizer={true}
                        rowTitle="SIDEARMS"
                        categoryName="EEquippableCategory::Sidearm"
                        getWeapons={getWeapons || []}
                        handleChooseWeapon={handleChooseWeapon}
                        padding={true}
                        height={true}
                        resizable={true}
                    />
                </div>

                <div className="flex gap-1">
                    <div className="flex flex-col">
                        {/* SMG AND SHOTGUN ROW */}
                        <div className="w-60 text-xs">
                            {SmgAndShotgunList.map(
                                ({ rowTitle, categoryName, getWeapons, resizable }) => (
                                    <ReusableWeaponsDisplay
                                        key={categoryName}
                                        loading={loading}
                                        length={2}
                                        loadingResizer={false}
                                        rowTitle={rowTitle}
                                        categoryName={categoryName}
                                        getWeapons={getWeapons}
                                        handleChooseWeapon={handleChooseWeapon}
                                        padding={false}
                                        height={true}
                                        resizable={resizable}
                                    />
                                )
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col">
                        {/* SNIPERS ROW */}
                        <div className="w-60 text-xs">
                            {SnipersList.map(
                                ({ rowTitle, categoryName, getWeapons, resizable }) => (
                                    <ReusableWeaponsDisplay
                                        key={categoryName}
                                        loading={loading}
                                        length={3}
                                        loadingResizer={false}
                                        rowTitle={rowTitle}
                                        categoryName={categoryName}
                                        getWeapons={getWeapons}
                                        handleChooseWeapon={handleChooseWeapon}
                                        padding={true}
                                        height={false}
                                        resizable={resizable}
                                    />
                                )
                            )}
                        </div>

                        <div className="w-60 text-xs">
                            {MachineGunsList.map(
                                ({ rowTitle, categoryName, getWeapons, resizable }) => (
                                    <ReusableWeaponsDisplay
                                        key={categoryName}
                                        loading={loading}
                                        length={2}
                                        loadingResizer={false}
                                        rowTitle={rowTitle}
                                        categoryName={categoryName}
                                        getWeapons={getWeapons}
                                        handleChooseWeapon={handleChooseWeapon}
                                        padding={false}
                                        height={true}
                                        resizable={resizable}
                                    />
                                )
                            )}
                        </div>
                    </div>
                </div>

                {/* RIFLES ROW */}
                <div className="w-60 text-xs">
                    <ReusableWeaponsDisplay
                        loading={loading}
                        length={4}
                        loadingResizer={false}
                        rowTitle="RIFLES"
                        categoryName="EEquippableCategory::Rifle"
                        getWeapons={getWeapons || []}
                        handleChooseWeapon={handleChooseWeapon}
                        padding={false}
                        height={true}
                        resizable={false}
                    />
                </div>
            </div>

            {/* STATS OF THE WEAPON MUST BE DISPLAYED */}
            <ReusableDisplayWeaponStats selectedWeapon={selectedWeapon || []} />
        </div>
    );
}

function getSmgAndShotgunList(getWeapons: WeaponProps[] | null) {
    return [
        {
            rowTitle: "SMGS",
            categoryName: "EEquippableCategory::SMG",
            getWeapons: getWeapons || [],
            resizable: false,
        },
        {
            rowTitle: "SHOTGUNS",
            categoryName: "EEquippableCategory::Shotgun",
            getWeapons: getWeapons || [],
            resizable: false,
        },
    ];
}

function getSnipersList(getWeapons: WeaponProps[] | null) {
    return [
        {
            rowTitle: "SNIPERS",
            categoryName: "EEquippableCategory::Sniper",
            getWeapons: getWeapons || [],
            resizable: false,
        },
    ];
}

function getMachineGunsList(getWeapons: WeaponProps[] | null) {
    return [
        {
            rowTitle: "MACHINE GUNS",
            categoryName: "EEquippableCategory::Heavy",
            getWeapons: getWeapons || [],
            resizable: false,
        },
    ];
}
