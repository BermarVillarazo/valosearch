export type AgentProps = {
    uuid?: string | number;
    abilities?: AblitiesProps[];

    // BACKGROUND IMAGE FOR THE AGENT
    background?: string;
    backgroundGradientColors?: string[];

    // BUST PORTRAIT
    bustPortrait?: string;

    description?: string;

    // UNKNOWN
    developerName?: string;

    // PROFILE IMAGE
    displayIcon?: string;
    // PROFILE IMAGE SMALL RESO
    displayIconSmall?: string;

    // NAME FOR THE AGENT
    displayName?: string;

    // FULL BODY IMAGE
    fullPortrait?: string;

    // IF FULLPORTRAIT IS NOT AVAILABLE USE THIS BELOW
    fullPortraitV2?: string;

    isPlayableCharacter?: boolean;
    role?: RoleProps[];
};

type AblitiesProps = {
    slot: string;
    displayName: string;
    description: string;
    displayIcon: string;
};

type RoleProps = {
    uuid: string | number;
    assetPath: string;
    description: string;
    displayIcon: string;
    displayName: string;
};