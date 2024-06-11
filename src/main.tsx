import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import {BrowserRouter as Router} from "react-router-dom";
import GameContextProvider from "./context/GameContext.tsx";
import axios from "axios";

axios.defaults.baseURL = "http://192.168.1.112:8000/api";
axios.defaults.headers.get['Accept'] = "application/json";
axios.defaults.headers.post['Accept'] = "application/json";
axios.defaults.headers.put['Accept'] = "application/json";
axios.defaults.headers.delete['Accept'] = "application/json";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Router>
        <GameContextProvider>
            <App/>
        </GameContextProvider>
    </Router>
);
