
import Homepage from "../pages/homepage";
import Login from "../pages/login";
import Cuti from "../pages/mawasdiri-page/cuti-form";
import Dashboard from "../pages/mawasdiri-page/dashboard";

export const routeList = [
    {
        path: "/",
        element: <Login/> 
    },
    {
        path: "/Home",
        element: <Homepage/>
    },
    {
        path: "/Dashboard",
        element: <Dashboard/>
    },
    {
        path: "/Cuti-form",
        element: <Cuti/>
    },

]