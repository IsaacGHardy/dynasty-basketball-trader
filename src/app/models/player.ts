export interface Player {
    id: number;
    name: string;
    position: string;
    team: string;
    age: number;
    value: number;
    stats?: {
        pts?: number;
        reb?: number;
        ast?: number;
        stl?: number;
        blk?: number;
        threepm?: number;
        fgp?: number;
        ftp?: number;
    };
}