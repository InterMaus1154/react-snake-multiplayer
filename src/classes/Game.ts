/*
* class for controlling game flow
* */

import {Coordinates, Snake} from "./Snake.ts";
import Food from "./Food.ts";
import {BoardSize, GameSetting} from "../context/GameContext.tsx";

type UpdateScoreCallback = (newScore: number) => void;
type UpdateGameStateCallback = (isGameOver: boolean) => void;

export class Game {

    context: CanvasRenderingContext2D;
    snakes: Snake[];
    food: Food;
    gameSettings: GameSetting;
    boardSize: BoardSize;
    unitSize: number;
    running: boolean;
    tickSpeed: number;
    canvasBackgroundColor: string;
    updatePlayerOneScore: UpdateScoreCallback;
    updatePlayerTwoScore: UpdateScoreCallback;
    updateGameStateCallback: UpdateGameStateCallback;
    playerOneScore: number;
    playerTwoScore: number;
    defaultSnakes: Snake[];
    isGameOver: boolean;

    constructor(context: CanvasRenderingContext2D, snakes: Snake[], food: Food, gameSettings: GameSetting, updatePlayerOneScore: UpdateScoreCallback, updatePlayerTwoScore: UpdateScoreCallback, updateGameStateCallback: UpdateGameStateCallback) {
        this.snakes = snakes;
        this.context = context;
        this.food = food;

        this.gameSettings = gameSettings;

        this.defaultSnakes = [];

        //extracting necessary values from settings for easier use
        this.boardSize = this.gameSettings.boardSize;
        this.unitSize = this.gameSettings.unitSize;
        this.tickSpeed = this.gameSettings.tickSpeed;
        this.canvasBackgroundColor = this.gameSettings.boardColor;

        this.updatePlayerOneScore = updatePlayerOneScore;
        this.updatePlayerTwoScore = updatePlayerTwoScore;
        this.updateGameStateCallback = updateGameStateCallback;

        this.running = false;
        this.isGameOver = false;

        this.playerOneScore = 0;
        this.playerTwoScore = 0;
    }

    //game entry point
    startGame() {
        window.localStorage.setItem("default-snakes", JSON.stringify(this.snakes));
        this.running = true;
        this.clearCanvas();
        this.createFoodCoordinates();
        this.drawFood();
        this.drawSnakes();
        this.controlSnakeOneMovement();
        this.controlSnakeTwoMovement();
        this.nextGameTick();
    }

    //game loop
    nextGameTick() {
        if (this.running) {
            setTimeout(() => {
                this.clearCanvas();
                this.drawFood();
                this.moveSnakes();
                this.drawSnakes();
                this.checkCollisionSelf();
                this.checkCollisionOther();
                this.nextGameTick();
            }, this.tickSpeed);
        }
    }

    //reset the game to its starting point
    resetGame() {
        this.running = false;
        this.clearCanvas();
        this.createFoodCoordinates();
        this.drawFood();
        this.snakes = JSON.parse(window.localStorage.getItem("default-snakes") as string) as Snake[];
        this.controlSnakeOneMovement();
        this.controlSnakeTwoMovement();
        this.playerOneScore = 0;
        this.playerTwoScore = 0;
        this.updatePlayerTwoScore(0);
        this.updatePlayerOneScore(0);
        if (this.isGameOver) {
            this.isGameOver = false;
            this.updateGameStateCallback(this.isGameOver);
            this.running = true;
            this.nextGameTick();
        } else {
            this.nextGameTick();
            this.running = true;
        }
    }

    //clear game canvas (board)
    clearCanvas() {
        this.context.fillStyle = this.canvasBackgroundColor;
        this.context.fillRect(0, 0, this.boardSize.width, this.boardSize.height);
    }

    //generating random coordinates for food
    createFoodCoordinates() {
        const randomNumber = (min: number, max: number): number => Math.round((Math.random() * (max - min) + min) / this.unitSize) * this.unitSize;

        this.food.x = randomNumber(0, this.boardSize.width - this.unitSize);
        this.food.y = randomNumber(0, this.boardSize.height - this.unitSize);
    }

    //drawing food onto canvas
    drawFood() {
        this.context.fillStyle = this.food.foodColor;
        this.context.fillRect(this.food.x, this.food.y, this.unitSize, this.unitSize);
    }


    //drawing snakes onto canvas
    drawSnakes() {
        this.snakes.forEach(snake => {
            this.context.fillStyle = snake.bodyColor;
            this.context.strokeStyle = snake.borderColor;

            snake.snakeParts.forEach(snakePart => {
                this.context.fillRect(snakePart.x, snakePart.y, this.unitSize, this.unitSize);
                this.context.strokeRect(snakePart.x, snakePart.y, this.unitSize, this.unitSize);
            });
        });
    }


    //move the snakes on the canvas
    moveSnakes() {

        this.snakes.forEach(snake => {
            //create next head
            const newHead = {x: snake.snakeParts[0].x + snake.xVelocity, y: snake.snakeParts[0].y + snake.yVelocity};

            //add new head to the array
            snake.snakeParts.unshift(newHead);

            //check if snakePart went out of screen
            snake.snakeParts.forEach(snakePart => {
                if (snakePart.x === this.boardSize.width) {
                    snakePart.x = 0;
                } else if (snakePart.x + this.unitSize === 0) {
                    snakePart.x = this.boardSize.width
                } else if (snakePart.y == this.boardSize.height) {
                    snakePart.y = 0;
                } else if (snakePart.y + this.unitSize === 0) {
                    snakePart.y = this.boardSize.height;
                }
            });

            //if food eaten, create new food, update score of x player
            //otherwise remove last element
            if (snake.snakeParts[0].x === this.food.x && snake.snakeParts[0].y === this.food.y) {

                //player one score
                if (snake.id === 1) {
                    this.playerOneScore += 1;
                    this.updatePlayerOneScore(this.playerOneScore);
                }
                //player two score
                else if (snake.id === 2) {
                    this.playerTwoScore += 1;
                    this.updatePlayerTwoScore(this.playerTwoScore);
                }

                //create new food
                this.createFoodCoordinates();
            } else {
                //remove last element (tail)
                snake.snakeParts.pop();
            }
        });
    }

    //snake one movement control by player
    //done via arrow keys
    controlSnakeOneMovement() {

        //first player's snake
        const snakeOne = this.snakes[0];
        const changeDirection = (e: KeyboardEvent) => {

            const isGoingRight = (snakeOne.xVelocity === this.unitSize);
            const isGoingLeft = (snakeOne.xVelocity === -this.unitSize);
            const isGoingUp = (snakeOne.yVelocity === -this.unitSize);
            const isGoingDown = (snakeOne.yVelocity === this.unitSize);

            const keyPressed = e.key;

            switch (true) {
                case (keyPressed === "ArrowUp" && !isGoingDown):
                    snakeOne.xVelocity = 0;
                    snakeOne.yVelocity = -this.unitSize;
                    break;
                case (keyPressed === "ArrowDown" && !isGoingUp):
                    snakeOne.xVelocity = 0;
                    snakeOne.yVelocity = this.unitSize;
                    break;
                case (keyPressed === "ArrowLeft" && !isGoingRight):
                    snakeOne.yVelocity = 0;
                    snakeOne.xVelocity = -this.unitSize;
                    break;
                case (keyPressed === "ArrowRight" && !isGoingLeft):
                    snakeOne.yVelocity = 0;
                    snakeOne.xVelocity = this.unitSize;
                    break;
            }
        }

        window.addEventListener("keydown", changeDirection);

    }

    //snake one movement control by player
    //done via arrow keys
    controlSnakeTwoMovement() {

        //second player's snake
        const snakeTwo = this.snakes[1];

        const changeDirection = (e: KeyboardEvent) => {

            const isGoingRight = (snakeTwo.xVelocity === this.unitSize);
            const isGoingLeft = (snakeTwo.xVelocity === -this.unitSize);
            const isGoingUp = (snakeTwo.yVelocity === -this.unitSize);
            const isGoingDown = (snakeTwo.yVelocity === this.unitSize);

            const keyPressed = e.key;

            switch (true) {
                case (keyPressed === "w" && !isGoingDown):
                    snakeTwo.xVelocity = 0;
                    snakeTwo.yVelocity = -this.unitSize;
                    break;
                case (keyPressed === "s" && !isGoingUp):
                    snakeTwo.xVelocity = 0;
                    snakeTwo.yVelocity = this.unitSize;
                    break;
                case (keyPressed === "a" && !isGoingRight):
                    snakeTwo.yVelocity = 0;
                    snakeTwo.xVelocity = -this.unitSize;
                    break;
                case (keyPressed === "d" && !isGoingLeft):
                    snakeTwo.yVelocity = 0;
                    snakeTwo.xVelocity = this.unitSize;
                    break;
            }
        }

        window.addEventListener("keydown", changeDirection);
    }

    //check if any snake is collided with itself
    checkCollisionSelf() {
        this.snakes.forEach(snake => {
            for (let i = 1; i < snake.snakeParts.length; i++) {
                if (snake.snakeParts[0].x === snake.snakeParts[i].x && snake.snakeParts[0].y === snake.snakeParts[i].y) {
                    this.running = false;
                    this.isGameOver = true;
                    this.updateGameStateCallback(this.isGameOver);
                }
            }
        });
    }

    //check if collided with the other snake
    checkCollisionOther() {
        const snakeOne = this.snakes[0];
        const snakeTwo = this.snakes[1];

        //check if snake two collided with snake one
        //if true, deduct one score from snake two
        for (let i = 0; i < snakeOne.snakeParts.length; i++) {
            if (snakeTwo.snakeParts[0].x === snakeOne.snakeParts[i].x && snakeTwo.snakeParts[0].y === snakeOne.snakeParts[i].y) {
                this.isGameOver = true;
                this.running = false;
                this.updateGameStateCallback(this.isGameOver);
            }
        }

        //check if snake one collided with snake two
        //if true, deduct one score from snake one
        for (let i = 0; i < snakeTwo.snakeParts.length; i++) {
            if (snakeOne.snakeParts[0].x === snakeTwo.snakeParts[i].x && snakeOne.snakeParts[0].y === snakeTwo.snakeParts[i].y) {
                this.isGameOver = true;
                this.running = false;
                this.updateGameStateCallback(this.isGameOver);
            }
        }
    }
}