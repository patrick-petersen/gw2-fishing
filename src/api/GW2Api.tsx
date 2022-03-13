export type CategoryJson = {
    id: Number,
    name: string,
    description: string,
    order: number,
    icon: string,
    achievements: Number[]
}

export enum AchievementFlags {
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
    flags: AchievementFlags[],
    bits: Bits[],
    tiers: Tiers[],
    rewards: Rewards[]
}

export enum state {
    LOADING,
    LOADED,
    ERROR
}

enum GameTypes {
    PvpLobby,
    Activity,
    Wvw,
    Dungeon,
    Pve
}

enum Restrictions {

}

enum ItemFlags {
    AccountBound,
    NoSell,
    AccountBindOnUse
}

export type ItemJson = {
    name: string,
    description: string,
    type: string,
    level: Number,
    rarity: string,
    vendor_value: Number,
    game_types: GameTypes[],
    flags: ItemFlags[],
    restrictions: Restrictions[],
    id: Number,
    chat_link: string,
    icon: string,
    details: {
        type: string
    }
}

export type Progress = {
    id: Number,
    bits: Number[],
    current: Number,
    max: Number,
    done: boolean
}

export abstract class GW2Api {
    private static access_token = "7C2B9D52-75C1-C54D-87B4-5EE1B757DC04BA98DC91-1D87-4FB7-BB51-FE0B21F90C8E";

    public static getCategory(id: Number): Promise<CategoryJson> {
        //https://api.guildwars2.com/v2/achievements/categories/317

        return fetch("https://api.guildwars2.com/v2/achievements/categories/" + id)
            .then(function(response) {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            })
            .then(response => response.json());
    }

    public static getAchievement(id: Number): Promise<AchievementJson> {
        //https://api.guildwars2.com/v2/achievements?ids=6201,6478,6109,6284,6279,6336
        return fetch("https://api.guildwars2.com/v2/achievements?ids=" + id)
            .then(function(response) {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            })
            .then(response => response.json())
            .then(response => response[0]);
    }

    public static getItems(ids: Number[]): Promise<ItemJson[]> {
        const idsString = ids.map(value => ""+value).reduce((previousValue, currentValue) => previousValue + "," + currentValue);
        return fetch("https://api.guildwars2.com/v2/items?ids=" + idsString)
            .then(function(response) {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            })
            .then(response => response.json());
    }

    public static getItem(id: Number): Promise<ItemJson> {
        return fetch("https://api.guildwars2.com/v2/items/" + id)
            .then(function(response) {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            })
            .then(response => response.json());
    }

    public static getProgress(id: Number): Promise<Progress> {
        return fetch("https://api.guildwars2.com/v2/account/achievements?access_token="+GW2Api.access_token+"&id=" + id)
            .then(function(response) {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            })
            .then(response => response.json());

    }
}