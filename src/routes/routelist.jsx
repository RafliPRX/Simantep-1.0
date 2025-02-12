import Homepage from "../pages/homepage";
import Login from "../pages/login";
import Absent_Page from "../pages/mawasdiri-page/absent-page";
import Cuti from "../pages/mawasdiri-page/cuti-form";
import Dashboard from "../pages/mawasdiri-page/dashboard";
import Dashboard_laras from "../pages/silaras-page/dashboard-laras";
import Fix_Detail from "../pages/silaras-page/fix-detail";
import Fix from "../pages/silaras-page/fix-form";
import Form_request from "../pages/silaras-page/form-req";
import Form_vehicle from "../pages/silaras-page/Form-Vehicle";
import Form_vehicle_Detail from "../pages/silaras-page/form-vehicle-detail";
import Request_Detail from "../pages/silaras-page/request-detail";
import Dashboard_simak from "../pages/Simak-page/dashboard-simak";
import Detail_Form_Propose from "../pages/Simak-page/update-form-propose";
import Detail_Form_withdrawl from "../pages/Simak-page/update-form-withdrawl";
import Form_withdrawl from "../pages/Simak-page/form-withdrawl";
import Proposed_Form from "../pages/Simak-page/proposed-form";


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
    {
        path: "/dashboard-laras",
        element: <Dashboard_laras/>
    },
    {
        path: "/form-perbaikan",
        element: <Fix/>
    },
    {
        path: "/form-kendaraan-dinas",
        element: <Form_vehicle/>
    },
    {
        path: "/form-permohonan-BHP-ATK",
        element: <Form_request/>
    },
    {
        path: '/dashboard-simak',
        element: <Dashboard_simak/>
    },
    {
        path: '/Withdrawl-form',
        element: <Form_withdrawl/>
    },
    {
        path: '/Propose-form',
        element: <Proposed_Form/>
    },
    {
        path: '/Absensi-Page',
        element: <Absent_Page/>
    },
    {
        path: "/form-perbaikan/:id",
        element: <Fix_Detail/>
    },
    {
        path: "/form-kendaraan-dinas/:id",
        element: <Form_vehicle_Detail/>
    },
    {
        path: "/form-permintaan-barang-baru/:id",
        element: <Request_Detail/>
    },
    {
        path: "/form-dana-RPD/:id",
        element: <Detail_Form_withdrawl/>
    },
    {
        path: "/form-dana-LPJ/:id",
        element: <Detail_Form_Propose/>
    },
]