
import Dashboard from "../pages/dashboard";
import Homepage from "../pages/homepage";
import Login from "../pages/login";

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
]