import React, {createContext} from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';
import UserStore from "./store/UserStore";
import RoomStore from "./store/RoomStore";


export const Context = createContext(null)

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <Context.Provider value={{
        user: new UserStore(),
        room: new RoomStore(),
    }}>
        <App />

    </Context.Provider>
);

