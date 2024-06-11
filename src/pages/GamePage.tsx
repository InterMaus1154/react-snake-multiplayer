import {FC, useContext, useEffect, useRef, useState} from 'react';
import Page from "./Page.tsx";
import Canvas from "../components/Canvas.tsx";
import "../style/Gamepage.css";
import {GameContext} from "../context/GameContext.tsx";
import {Snake} from "../classes/Snake.ts";
import Food from "../classes/Food.ts";
import {Game} from "../classes/Game.ts";
import GameOverModal from "../components/modals/GameOverModal.tsx";

const GamePage: FC = () => {

    //game settings
    const {gameSettings} = useContext(GameContext);

    //canvas ref
    const canvasRef = useRef<HTMLCanvasElement>(document.createElement("canvas"));

    const [playerOneScore, setPlayerOneScore] = useState<number>(0);
    const [playerTwoScore, setPlayerTwoScore] = useState<number>(0);

    //game over state
    const [isGameOver, setIsGameOver] = useState<boolean>(false);

    //game object
    const [game, setGame] = useState<Game | null>(null);


    const updatePlayerOneScore = (newScore: number) => {
        setPlayerOneScore(newScore);
    }

    const updatePlayerTwoScore = (newScore: number) => {
        setPlayerTwoScore(newScore);
    }

    const updateGameState = (isGameOver: boolean) => {
        setIsGameOver(isGameOver);
    };


    useEffect(() => {
        if (canvasRef.current === null) {
            return;
        }
        const canvas: HTMLCanvasElement = canvasRef.current;
        const context = canvas.getContext("2d");

        if (context === null) {
            return;
        }

        //initial snakes
        const snakes: Snake[] = [
            new Snake(1, gameSettings.snakeOneBodyColor, gameSettings.snakeOneBorderColor, [
                {x: gameSettings.unitSize * 3, y: 0},
                {x: gameSettings.unitSize * 2, y: 0},
                {x: gameSettings.unitSize, y: 0},
                {x: 0, y: 0}
            ]),
            new Snake(2, gameSettings.snakeTwoBodyColor, gameSettings.snakeTwoBorderColor, [
                {x: gameSettings.unitSize * 3, y: gameSettings.boardSize.height - 100},
                {x: gameSettings.unitSize * 2, y: gameSettings.boardSize.height - 100},
                {x: gameSettings.unitSize, y: gameSettings.boardSize.height - 100},
                {x: 0, y: gameSettings.boardSize.height - 100}
            ])
        ];

        //food
        const food: Food = new Food(gameSettings.foodColor);

        setGame(new Game(context, snakes, food, gameSettings, updatePlayerOneScore, updatePlayerTwoScore, updateGameState));


    }, [gameSettings]);

    useEffect(() => {
        if (game) {
            game.startGame();
        }
    }, [game]);

    const resetButtonHandler = () => {
        game?.resetGame();
    }

    return (
        <Page>
            <div className="game-page">
                <Canvas forwardRef={canvasRef} width={gameSettings.boardSize.width}
                        height={gameSettings.boardSize.height}/>
                <div className="scoreboard">
                    <h1>{gameSettings.playerOneName}'s score: {playerOneScore}</h1>
                    <h1>{gameSettings.playerTwoName}'s score: {playerTwoScore}</h1>
                    <button onClick={resetButtonHandler} className={"button-like"}>Reset Game</button>
                    {isGameOver ? <GameOverModal resetButtonHandler={resetButtonHandler} playerOneName={gameSettings.playerOneName} playerTwoName={gameSettings.playerTwoName} playerOneScore={playerOneScore} playerTwoScore={playerTwoScore} /> : ""}
                </div>
            </div>
        </Page>
    );
};

export default GamePage;