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

export abstract class GW2Api {

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

    public static getItems(ids: Number[]): Promise<ItemJson[]> {
        return fetch("https://api.guildwars2.com/v2/items?ids=" + ids.map(value => ""+value).reduce((previousValue, currentValue) => previousValue + "," + currentValue))
            .then(response => response.json());
    }

    public static getItem(id: Number): Promise<ItemJson> {
        return fetch("https://api.guildwars2.com/v2/items/" + id)
            .then(response => response.json());
    }
}