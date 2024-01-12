export type MapProps = {
    uuid?: string;
    displayName?: string;
    narrativeDescription?: string;
    tacticalDescription?: string;
    coordinates?: string;
    displayIcon?: string;
    listViewIcon?: string;
    splash?: string;
    callouts?: CalloutsProps[];
};

type CalloutsProps = {
    regionName: string;
    superRegionName: string;
    location: LocationProps;
};

type LocationProps = {
    x: number;
    y: number;
};
