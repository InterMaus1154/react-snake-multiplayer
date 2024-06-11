import {FC, ReactNode, useState, useContext, FormEvent} from 'react';
import "../../style/component_style/Modal.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import {GameContext} from "../../context/GameContext.tsx";


/*
* Modal for the initial load
* requests to enter player names
* */
const EntryModal: FC = () => {


    /*input fields states*/
    const [playerOneNameInput, setPlayerOneNameInput] = useState<string>("");
    const [playerTwoNameInput, setPlayerTwoNameInput] = useState<string>("");

    //game settings context for setting player names
    const {setGameSettings} = useContext(GameContext);

    //hook for redirects
    const navigate = useNavigate();

    //submit form handler
    const submitForm = (e: FormEvent<HTMLFormElement>) => {
        //prevent page reload
        e.preventDefault();

        //validating inputs
        if(playerOneNameInput.trim().length === 0 || playerTwoNameInput.trim().length === 0){
            alert("Empty names are not allowed!")
            return;
        }

        //setting the player names to global settings
        setGameSettings(prevState => {

            prevState.playerOneName = playerOneNameInput;
            prevState.playerTwoName = playerTwoNameInput;

            return prevState;
        });

        //redirect to game setup page
        navigate("/game-setup");
    };

    return (
        <div className="modal-component entry-modal">
            <div className="modal-header">
                <h1>React Snake Game v1.0</h1>
                <h2>Enter player names to continue</h2>
                <h3>This game is desktop intended only</h3>
            </div>
            <form onSubmit={submitForm}>
                <div className="modal-body">
                    <div className="player-inputs-container">
                        <label htmlFor="player-one">
                    <span className={"fa-icon-wrapper"} aria-label={"Player One"}>
                        <FontAwesomeIcon icon={faUser}/>
                    </span>
                            <input type="text" id={"player-one"} placeholder={"Player 1 name"} required={true} onChange={e => setPlayerOneNameInput(e.target.value)}/>
                        </label>
                        <label htmlFor="player-two">
                    <span className={"fa-icon-wrapper"} aria-label={"Player Two"}>
                        <FontAwesomeIcon icon={faUser}/>
                    </span>
                            <input type="text" placeholder={"Player 2 name"} id={"player-two"} required={true} onChange={e => setPlayerTwoNameInput(e.target.value)}/>
                        </label>
                    </div>
                </div>
                <div className="modal-buttons">
                    <button className={"button-like"} type={"submit"}>
                        Continue
                    </button>
                </div>
            </form>

        </div>
    );
};

export default EntryModal;