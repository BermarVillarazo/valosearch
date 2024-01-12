import { WeaponProps } from "@/lib/WeaponProps";

type WeaponStatsProps = {
    selectedWeapon: WeaponProps[];
};

export default function ReusableDisplayWeaponStats({ selectedWeapon }: WeaponStatsProps) {
    return (
        <>
            {selectedWeapon?.map(
                ({
                    uuid,
                    displayName,
                    weaponStats: {
                        fireRate,
                        equipTimeSeconds,
                        firstBulletAccuracy,
                        reloadTimeSeconds,
                        magazineSize,
                        damageRanges,
                    } = {},
                }) => {
                    const links = [
                        { title: "FIRE RATE", value: fireRate, unit: "RDS/SEC" },
                        { title: "EQUIP SPEED", value: equipTimeSeconds, unit: "SEC" },
                        {
                            title: "1ST SHOT SPREAD",
                            value: firstBulletAccuracy,
                            unit: "DEG (HIP/ADS)",
                        },
                        { title: "RELOAD SPEED", value: reloadTimeSeconds, unit: "SEC" },
                        { title: "MAGAZINE", value: magazineSize, unit: "RDS" },
                    ];
                    return (
                        <div key={uuid} className="flex justify-center py-5">
                            <div className="flex flex-col">
                                <div className="flex justify-between bg-green-400/60 py-1 px-3">
                                    <Title displayName={displayName} isSubTitle={false} />
                                    <p className="my-auto">RIFLE</p>
                                </div>
                                <div className="flex flex-wrap justify-center gap-2 bg-slate-50/20 py-5">
                                    {links.map(({ title, value, unit }) => (
                                        <div
                                            key={title}
                                            className="w-5/12 text-center bg-slate-50/20"
                                        >
                                            <h1 className="bg-slate-50/20 py-1 font-bold">
                                                {title}
                                            </h1>
                                            <div className="flex flex-col my-2">
                                                <p className="font-bold text-2xl">{value}</p>
                                                <span>{unit}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="border-b-2 border-b-l-2 bg-slate-50/40">
                                    <div className="flex mx-3">
                                        <div className="py-1">
                                            <Title displayName="DAMAGE" isSubTitle={true} />
                                        </div>
                                        <div className="flex justify-evenly mt-auto w-full pt-auto gap-2">
                                            {damageRanges?.map(
                                                ({ rangeStartMeters, rangeEndMeters }) => (
                                                    <div
                                                        key={rangeStartMeters}
                                                        className="border-b-2 text-sm"
                                                    >
                                                        <span>
                                                            {rangeStartMeters}-{rangeEndMeters}m
                                                        </span>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* DAMAGE FROM EACH WEAPONS */}
                                <div className="flex flex-col gap-2 bg-slate-50/20 p-3">
                                    <div className="flex justify-between bg-slate-50/20 p-5 font-medium text-lg">
                                        <p className="w-[90px] text-green-400/80 my-auto">HEAD</p>
                                        <div className="flex justify-evenly w-full text-center">
                                            {damageRanges?.map(({ headDamage }, index) => (
                                                <p
                                                    key={index}
                                                    className={`w-[90px] text-2xl ${
                                                        index === 2 ? "text-gray-200/40" : ""
                                                    }`}
                                                >
                                                    {Math.round(headDamage ?? 0)}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex justify-between bg-slate-50/20 p-5 font-medium text-lg">
                                        <p className="w-[90px] text-green-400/80 my-auto">BODY</p>
                                        <div className="flex justify-evenly w-full text-center">
                                            {damageRanges?.map(({ bodyDamage }, index) => (
                                                <p
                                                    key={index}
                                                    className={`w-[90px] text-2xl ${
                                                        index === 2 ? "text-gray-200/40" : ""
                                                    }`}
                                                >
                                                    {Math.round(bodyDamage ?? 0)}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex justify-between bg-slate-50/20 p-5 font-medium text-lg">
                                        <p className="w-[90px] text-green-400/80 my-auto">LEG</p>
                                        <div className="flex justify-evenly w-full text-center">
                                            {damageRanges?.map(({ legDamage }, index) => (
                                                <p
                                                    key={index}
                                                    className={`w-[90px] text-2xl ${
                                                        index === 2 ? "text-gray-200/40" : ""
                                                    }`}
                                                >
                                                    {Math.round(legDamage ?? 0)}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                }
            )}
        </>
    );
}

function DamageCategory({
    category,
    damageRanges,
}: {
    category: string;
    damageRanges?: WeaponProps[];
}) {
    return (
        <div className="flex justify-between bg-slate-50/20 p-5 font-medium text-lg">
            <p className="w-[90px] text-green-400/80 my-auto">{category}</p>
            <div className="flex justify-evenly w-full text-center">
                {damageRanges?.map(({ weaponStats }) => (
                    <p
                        key={weaponStats?.damageRanges?.[0]?.headDamage}
                        className="w-[90px] text-2xl"
                    >
                        {weaponStats?.damageRanges?.[0]?.headDamage}
                    </p>
                ))}
            </div>
        </div>
    );
}

type TitleProps = {
    displayName?: string;
    isSubTitle: boolean;
};

function Title({ displayName, isSubTitle }: TitleProps) {
    return (
        <>
            <p className={`${isSubTitle ? "text-xl" : "text-2xl"} font-bold`}>
                {displayName?.toUpperCase()}
            </p>
        </>
    );
}
