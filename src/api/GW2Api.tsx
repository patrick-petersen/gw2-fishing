export type CategoryJson = {
    id: Number,
    name: string,
    description: string,
    order: number,
    icon: string,
    achievements: Number[]
}

export enum Flags {
    IgnoreNearlyComplete,
    Pvp,
    RepairOnLogin,
    Permanent
}

export type Bits = {
    type: string,
    id: Number
}

type Tiers = {
    count: Number,
    points: Number
}

type Rewards = {
    type: string,
    id: Number,
    count: Number
}


export type AchievementJson = {
    id: Number,
    name: string,
    description: string,
    requirement: string,
    locked_text: string,
    type: string,
    flags: Flags[],
    bits: Bits[],
    tiers: Tiers[],
    rewards: Rewards[]
}

export enum state {
    LOADING,
    LOADED,
    ERROR
}


export abstract class GW2Api {
    public static myProp = "Hello";

    public static doSomething(): string {
        return "World";
    }

    public static getCategory(id: Number): Promise<CategoryJson> {
        //https://api.guildwars2.com/v2/achievements/categories/317

        return fetch("https://api.guildwars2.com/v2/achievements/categories/" + id)
            .then(response => response.json());
    }

    public static getAchievement(id: Number): Promise<AchievementJson> {
        //https://api.guildwars2.com/v2/achievements?ids=6201,6478,6109,6284,6279,6336
        return fetch("https://api.guildwars2.com/v2/achievements?ids=" + id)
            .then(response => response.json())
            .then(response => response[0]);
    }
}