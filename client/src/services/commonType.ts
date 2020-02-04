export interface IMovie {
    name: string;
    _id?: string;
    types: string[];

    areas: string[];
    timeLong: number;
    isHot: boolean;
    isComming: boolean;
    isClassic: boolean;
    description?: string;
    poster?: string;
}
export interface ICondition {
    page?: number,
    limit?: number,
    key?: string
}