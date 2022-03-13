type CategoryJson = {
    id: Number,
    name: string,
    description: string,
    order: number,
    icon: string,
    achievements: Number[]
}

type AchievementJson = {

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
            .then(response => response.json());
    }
}