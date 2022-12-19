
import {ADMIN_ROUTE, EXPOSITION_ROUTE, HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, ROOM_ROUTE} from "./utils/consts";
import Admin from './pages/Admin';
import Room from "./pages/Room";
import Exposition from "./pages/Exposition";
import Auth from "./pages/Auth";
import Home from "./pages/Home";

export const authRoutes = [
    {
        path: EXPOSITION_ROUTE,
        Component: Exposition
    },
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: ROOM_ROUTE + '/:id',
        Component: Room
    },
]

export const publicRoutes = [
    {
        path: HOME_ROUTE,
        Component: Home
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },

]