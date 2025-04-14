import Homepage from "../pages/homepage";
import Login from "../pages/login";
import Cuti from "../pages/mawasdiri-page/cuti-form";
import Dashboard from "../pages/mawasdiri-page/dashboard";
import Dashboard_laras from "../pages/silaras-page/dashboard-laras";

import Fix from "../pages/silaras-page/fix-form";
import Form_request from "../pages/silaras-page/form-req";
import Form_vehicle_Detail from "../pages/silaras-page/form-vehicle-update";
import Request_Detail from "../pages/silaras-page/request-update";
import Dashboard_simak from "../pages/Simak-page/dashboard-simak";
import Detail_Form_Propose from "../pages/Simak-page/update-form-propose";
import Detail_Form_withdrawl from "../pages/Simak-page/update-form-withdrawl";
import Form_withdrawl from "../pages/Simak-page/form-withdrawl";
import Proposed_Form from "../pages/Simak-page/proposed-form";
import Fix_Detail from "../pages/silaras-page/fix-detail";
import Form_vehicle from "../pages/silaras-page/form-Vehicle";
import Cuti_Detail from "../pages/mawasdiri-page/cuti-detail";
import Absent_Page_Out from "../pages/mawasdiri-page/absent-page-out";
import Absent_Page from "../pages/mawasdiri-page/absent-page-in";
import Login_ADM from "../pages/login_adm";
import Signup from "../pages/signup";
import Absent_Page_Malam from "../pages/mawasdiri-page/absent-page-in-malam";
import Absent_Page_Out_Malam from "../pages/mawasdiri-page/absent-page-out-malam";


export const routeList = [
    {
        path: "/",
        element: <Login/> 
    },
    {
        path: "/signup",
        element: <Signup/> 
    },
    {
        path: "/admin",
        element: <Login_ADM/> 
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
        element: <Absent_Page />
    },
    {
        path: '/Absensi-Page-Malam',
        element: <Absent_Page_Malam/>
    },
    {
        path: '/Absensi-Page-Keluar/:id',
        element: <Absent_Page_Out/>
    },
    {
        path: '/Absensi-Page-Keluar-Malam/:id',
        element: <Absent_Page_Out_Malam/>,
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
    {
        path: "/Cuti-detail/:id",
        element: <Cuti_Detail/>
    },
]