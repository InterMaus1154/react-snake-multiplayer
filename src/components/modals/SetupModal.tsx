import {FC, FormEvent, useContext, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import {BoardSize, GameContext} from "../../context/GameContext.tsx";


const SetupModal: FC = () => {

    //global settings context
    const {gameSettings, setGameSettings} = useContext(GameContext);

    //states for player one inputs
    const [playerOneSnakeBodyColor, setPlayerOneSnakeBodyColor] = useState<string>(gameSettings.snakeOneBodyColor);
    const [playerOneSnakeBorderColor, setPlayerOneSnakeBorderColor] = useState<string>(gameSettings.snakeOneBorderColor);

    //states for player two inputs
    const [playerTwoSnakeBodyColor, setPlayerTwoSnakeBodyColor] = useState<string>(gameSettings.snakeTwoBodyColor);
    const [playerTwoSnakeBorderColor, setPlayerTwoSnakeBorderColor] = useState<string>(gameSettings.snakeTwoBorderColor);

    //states for board inputs
    const [boardBackgroundColor, setBoardBackgroundColor] = useState<string>(gameSettings.boardColor);
    const [boardSizeWidth, setBoardSizeWidth] = useState<number>(gameSettings.boardSize.width);
    const [boardSizeHeight, setBoardSizeHeight] = useState<number>(gameSettings.boardSize.height);
    const [foodColor, setFoodColor] = useState<string>(gameSettings.foodColor);

    //for redirects
    const navigate = useNavigate();

    //submit form handler
    const submitForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //check if sizes are divisible by 25
        if(boardSizeWidth % 25 !== 0 || boardSizeHeight % 25 !== 0){
            alert("Width and height must be divisible by 25!");
            return;
        }

        //set the context values
        setGameSettings(prevState => {

            prevState.snakeOneBodyColor = playerOneSnakeBodyColor;
            prevState.snakeOneBorderColor = playerOneSnakeBorderColor;

            prevState.snakeTwoBodyColor = playerTwoSnakeBodyColor;
            prevState.snakeTwoBorderColor = playerTwoSnakeBorderColor;

            prevState.foodColor = foodColor;

            prevState.boardColor = boardBackgroundColor;

            prevState.boardSize = {
                width: boardSizeWidth,
                height: boardSizeHeight
            };

            return prevState;
        });

        //redirect to game page
        navigate("/game");
    };

    return (
        <div className="modal-component entry-modal">
            <div className="modal-header">
                <h1>Choose colors</h1>
            </div>
            <form onSubmit={submitForm}>
                <div className="modal-body">
                    <div className="player-inputs-container">
                        {/*PLAYER ONE SETTINGS*/}
                        <div className="player-one-inputs player-inputs">
                            <h2>{gameSettings.playerOneName}'s snake</h2>
                            <label htmlFor="player-one-snake-bg">
                                <span>Snake body color:</span>
                                <input type="color" value={playerOneSnakeBodyColor}
                                       onChange={e => setPlayerOneSnakeBodyColor(e.target.value)}
                                       id={"player-one-snake-bg"}/>
                            </label>
                            <label htmlFor="player-one-snake-border">
                                <span>Snake border color:</span>
                                <input type="color" value={playerOneSnakeBorderColor}
                                       onChange={e => setPlayerOneSnakeBorderColor(e.target.value)}
                                       id={"player-one-snake-border"}/>
                            </label>
                        </div>
                        {/*PLAYER TWO SETTINGS*/}
                        <div className="player-two-inputs player-inputs">
                            <h2>{gameSettings.playerTwoName}'s snake</h2>
                            <label htmlFor="player-one-snake-bg">
                                <span>Snake body color:</span>
                                <input type="color" value={playerTwoSnakeBodyColor}
                                       onChange={e => setPlayerTwoSnakeBodyColor(e.target.value)}
                                       id={"player-one-snake-bg"}/>
                            </label>
                            <label htmlFor="player-one-snake-border">
                                <span>Snake border color:</span>
                                <input type="color" value={playerTwoSnakeBorderColor}
                                       onChange={e => setPlayerTwoSnakeBorderColor(e.target.value)}
                                       id={"player-one-snake-border"}/>
                            </label>
                        </div>
                        {/*BOARD SETTINGS INPUTS*/}
                        <div className="board-inputs player-inputs">
                            <h2>Board settings</h2>
                            <label htmlFor="board-bg-color">
                                <span>Board background color:</span>
                                <input type="color" value={boardBackgroundColor}
                                       onChange={e => setBoardBackgroundColor(e.target.value)} id={"board-bg-color"}/>
                            </label>
                            <label htmlFor="food-color">
                                <span>Food color:</span>
                                <input type="color" value={foodColor}
                                       onChange={e => setFoodColor(e.target.value)} id={"food-color"}/>
                            </label>
                            <label htmlFor="board-size-width">
                                <span>Board width:(must be divisible by 25)</span>
                                <input type="number" id={"board-size-width"} value={boardSizeWidth}
                                       onChange={e => setBoardSizeWidth(parseInt(e.target.value))}/>
                            </label>
                            <label htmlFor="board-size-height">
                                <span>Board height:(must be divisible by 25)</span>
                                <input type="number" id={"board-size-height"} value={boardSizeHeight}
                                       onChange={e => setBoardSizeHeight(parseInt(e.target.value))}/>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="modal-buttons">
                    <button className={"button-like"} type={"submit"}>
                        Start game
                    </button>
                </div>
            </form>

        </div>
    );
};

export default SetupModal;