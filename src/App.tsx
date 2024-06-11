import {FC, useEffect, useState} from 'react';
import "./style/App.css";
import {Route, Routes} from "react-router";
import EntryPage from "./pages/EntryPage.tsx";
import SetupPage from "./pages/SetupPage.tsx";
import GamePage from "./pages/GamePage.tsx";
import {NavLink} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome} from "@fortawesome/free-solid-svg-icons";

const App: FC = () => {


    const [deviceWidth, setDeviceWidth] = useState(window.innerWidth);

    useEffect(() => {

        const changeSize = () => {
            setDeviceWidth(window.innerWidth);
        }

        window.addEventListener("resize", changeSize);

        return () => {
            window.removeEventListener("resize", changeSize);
        }

    }, []);


    return (
        deviceWidth > 600 ? <div className="app-component">
            <NavLink to={'/'} aria-label={"Return to main menu"} className={"go-home-button"}
                     title={"Return to main menu"}>
                <span className={"fa-icon-wrapper"}>
                    <FontAwesomeIcon icon={faHome}/>
                </span>
            </NavLink>
            <Routes>
                <Route path={"/"} element={<EntryPage/>}></Route>
                <Route path={"/game-setup"} element={<SetupPage/>}></Route>
                <Route path={"/game"} element={<GamePage/>}></Route>
            </Routes>
        </div> : <h1 style={{textAlign: "center"}}>Your device size is too small for this game!</h1>
    );
};

export default App;