import {FC, createContext, useState, Dispatch, SetStateAction, ReactNode} from 'react';


/*
* context for accessing game settings globally in the app
* also for constant values, eg unitsize or tick speed, that cannot be changed by player
* */

export interface BoardSize {
    width: number;
    height: number;
}

export interface GameSetting {
    playerOneName: string;
    playerTwoName: string;
    snakeOneBodyColor: string;
    snakeTwoBodyColor: string;
    snakeOneBorderColor: string;
    snakeTwoBorderColor: string;
    foodColor: string;
    boardColor: string;
    boardSize: BoardSize;
    unitSize: number;
    tickSpeed: number;
}

interface GameContext {
    gameSettings: GameSetting;
    setGameSettings: Dispatch<SetStateAction<GameSetting>>;
}

export const GameContext = createContext<GameContext>({} as GameContext);

interface GameContextProvider {
    children: ReactNode;
}

const GameContextProvider: FC<GameContextProvider> = ({children}: GameContextProvider) => {

    const [gameSettings, setGameSettings] = useState<GameSetting>({
        playerOneName: "Jack",
        playerTwoName: "John",
        snakeOneBodyColor: "#00FF00",
        snakeTwoBodyColor: "#460a09",
        snakeOneBorderColor: "#AAAA00",
        snakeTwoBorderColor: "#FFFF00",
        foodColor: "#FF00FF",
        boardColor: "#F3F3F3",
        boardSize: {
            width: 725,
            height: 725
        },
        unitSize: 25,
        tickSpeed: 125
    } as GameSetting);

    return (
        <GameContext.Provider value={{gameSettings, setGameSettings}}>
            {children}
        </GameContext.Provider>
    );
};

export default GameContextProvider;