export type WeaponProps = {
    uuid?: string;
    category?: string;
    displayName?: string;
    displayIcon?: string;
    killStreamIcon?: string;
    shopData?: ShopDataProps;
    weaponStats?: WeaponStatsProps;
};

type WeaponStatsProps = {
    fireRate?: number;
    magazineSize?: number;
    runSpeedMultiplier?: number;
    equipTimeSeconds?: number;
    reloadTimeSeconds?: number;
    firstBulletAccuracy?: number;
    adsStats?: AdsStatsProps;
    damageRanges?: DamageRangesProps[];
};

type AdsStatsProps = {
    zoomMultiplier?: number;
    fireRate?: number;
    runSpeedMultiplier?: number;
    burstCount?: number;
    firstBulletAccuracy?: number;
};

type DamageRangesProps = {
    rangeStartMeters?: number;
    rangeEndMeters?: number;
    headDamage?: number;
    bodyDamage?: number;
    legDamage?: number;
};

type ShopDataProps = {
    cost?: number;
    newImage?: string;
};
