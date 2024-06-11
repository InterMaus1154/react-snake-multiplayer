/*Snake class*/


export interface Coordinates {
    x: number;
    y: number;
}

export class Snake {

    id: number;
    bodyColor: string;
    borderColor: string;
    snakeParts: Coordinates[];
    xVelocity: number;
    yVelocity: number;

    constructor(id: number, bodyColor: string, borderColor: string, snakeParts: Coordinates[]) {
        this.bodyColor = bodyColor;
        this.borderColor = borderColor;
        this.snakeParts = snakeParts;
        this.id = id;

        //starting velocities
        this.xVelocity = 25;
        this.yVelocity = 0;
    }
}