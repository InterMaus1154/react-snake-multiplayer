
/*
* food class
* */

export default class Food {

    foodColor: string;
    x: number;
    y: number;

    constructor(foodColor: string) {
        this.foodColor = foodColor;

        this.x = 0;
        this.y = 0;
    }
}