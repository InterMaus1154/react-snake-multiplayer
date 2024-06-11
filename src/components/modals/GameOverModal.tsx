import {FC, useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";

interface GameOverModal {
    resetButtonHandler: () => void;
    playerOneName: string;
    playerTwoName: string;
    playerOneScore: number;
    playerTwoScore: number;
}


/*
* gameover modal shown when the game is over
*
* */


const GameOverModal: FC<GameOverModal> = ({
                                              resetButtonHandler,
                                              playerOneName,
                                              playerTwoName,
                                              playerOneScore,
                                              playerTwoScore
                                          }: GameOverModal) => {


    //for redirect
    const navigate = useNavigate();

    //message after upload score
    const [textMessage, setTextMessage] = useState<string>("");

    //save game results
    const saveGameHandler = () => {

        axios.post('/game', {
            "playerOneScore": playerOneScore,
            "playerTwoScore": playerTwoScore,
            "playerOneName": playerOneName,
            "playerTwoName": playerTwoName
        })
            .then(response => {
                setTextMessage(response.data.message);
            })
            .catch(error => {
                if (!error.response) {
                    setTextMessage("You are currently offline (no server connection)");
                    return;
                }
                setTextMessage(error.response.data.message);
            });
    };

    //main menu navigate
    const goHomeHandler = () => {
        navigate("/");
    };

    return (
        <div className="modal-background">
            <div className="gameover-modal modal-component">
                <div className="modal-header">
                    <h1>Game over!</h1>
                    <h2>Save your result or start a new game!</h2>
                    {textMessage.trim().length > 0 && <h3>{textMessage}</h3>}
                </div>
                <div className="modal-body">
                    <h2>{playerOneName}'s score: {playerOneScore}</h2>
                    <h2>{playerTwoName}'s score: {playerTwoScore}</h2>
                </div>
                <div className="modal-buttons">
                    <button className="button-like" onClick={resetButtonHandler}>Restart game</button>
                    <button className="button-like save-game-button" onClick={saveGameHandler}>Save results</button>
                    <button className="button-like home-button" onClick={goHomeHandler}>Main menu</button>
                </div>
            </div>
        </div>
    );
};

export default GameOverModal;