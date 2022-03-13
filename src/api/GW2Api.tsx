type CategoryJson = {
    id: Number,
    name: string,
    description: string,
    order: number,
    icon: string,
    achievements: Number[]
}

export abstract class GW2Api {
    public static myProp = "Hello";

    public static doSomething(): string {
        return "World";
    }

    public static getCategory(id: Number): CategoryJson {
        return {
            "id": 317,
            "name": "Fishing",
            "description": "",
            "order": 11,
            "icon": "https://render.guildwars2.com/file/0658FB1E0BB83E3391091FF71B92F722BD51B803/2604532.png",
            "achievements": [
            6201,
            6478,
            6109,
            6284,
            6279,
            6336,
            6342,
            6258,
            6506,
            6179,
            6330,
            6068,
            6344,
            6363,
            6489,
            6317,
            6106,
            6224,
            6471,
            6264,
            6192,
            6466,
            6402,
            6153,
            6484,
            6263,
            6475,
            6227,
            6339,
            6509,
            6250,
            6110,
            6439,
            6505
        ]
        }
    }
}