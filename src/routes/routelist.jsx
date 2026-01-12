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
import RoutedProtected from "./routed_protected";
import Home_Admin from "../pages/Admin-Page/home_admin";
import Admin_Dashboard from "../pages/Admin-Page/admin_dashboard";
import Identity_Create_Form from "../pages/Admin-Page/identity_create_form";
import RoleCreateForm from "../pages/Admin-Page/role_create_form";
import Account_Create_Form from "../pages/Admin-Page/account_create_form";
import Detail_Form_RoleLv1 from "../pages/Admin-Page/role_detail";
import Detail_Form_IdentityLv1 from "../pages/Admin-Page/identity_detail";
import Detail_Form_Account from "../pages/Admin-Page/account_detail";
// import Maintanance from "../pages/maintanance-page/maintanance";


export const routeList = [
    // {
    //     path: "/",
    //     element: <Maintanance/> 
    // },
    {
        path: "/",
        element: <Login/> 
    },
    {
        path: "/signup",
        element: <Signup/> 
    },
    {
        path: "/Admin-Login",
        element: <Login_ADM/>  
    },
    {
        path: "/Home-Admin",
        element: (
            <RoutedProtected>
                <Home_Admin/>
            </RoutedProtected>
        ),
    },
    {
        path: "/Home-Admin/Akun-Dashboard",
        element: (
            <RoutedProtected>
                <Admin_Dashboard/>
            </RoutedProtected>
        ),
    },
    {
        path: "/Home-Admin/Tambah-Identitas",
        element: (
            <RoutedProtected>
                <Identity_Create_Form/>
            </RoutedProtected>
        ),
    },
    {
        path: "/Home-Admin/Tambah-Akun",
        element: (
            <RoutedProtected>
                <Account_Create_Form/>
            </RoutedProtected>
        ),
    },
    {
        path: "/Home-Admin/Tambah-Role",
        element: (
            <RoutedProtected>
                <RoleCreateForm/>
            </RoutedProtected>
        ),
    },
    {
        path: '/Home-Admin/Update-Role/:level/:id',
        element: (
            <RoutedProtected>
                <Detail_Form_RoleLv1/>
            </RoutedProtected>
        ),
    },
    {
        path: '/Home-Admin/Update-Identity/:level/:id',
        element: (
            <RoutedProtected>
                <Detail_Form_IdentityLv1/>
            </RoutedProtected>
        ),
    },
    {
        path: '/Home-Admin/Update-Account/:level/:id',
        element: (
            <RoutedProtected>
                <Detail_Form_Account/>
            </RoutedProtected>
        ),
    },
    {
        path: "/Home/:level",
        element: (
            <RoutedProtected>
                <Homepage/>
            </RoutedProtected>
        ),
    },
    {
        path: "/Dashboard/:level/:role/:role_sp",
        element: (
            <RoutedProtected>
                <Dashboard/>
            </RoutedProtected>
        ),
    },
    {
        path: "/Dashboard/:level/:role/:role_sp/Cuti-form",
        element: (
            <RoutedProtected>
                <Cuti/>
            </RoutedProtected>
        ),
    },
    {
        path: "/dashboard-laras",
        element: (
            <RoutedProtected>
                <Dashboard_laras/>
            </RoutedProtected>
        ),
    },
    {
        path: "/form-perbaikan",
        element: (
            <RoutedProtected>
                <Fix/>
            </RoutedProtected>
        ),
    },
    {
        path: "/form-kendaraan-dinas",
        element: (
            <RoutedProtected>
                <Form_vehicle/>
            </RoutedProtected>
        ),
    },
    {
        path: "/form-permohonan-BHP-ATK",
        element: (
            <RoutedProtected>
                <Form_request/>
            </RoutedProtected>
        ),
    },
    {
        path: '/dashboard-simak',
        element: (
            <RoutedProtected>
                <Dashboard_simak/>
            </RoutedProtected>
        ),
    },
    {
        path: '/Withdrawl-form',
        element: (
            <RoutedProtected>
                <Form_withdrawl/>
            </RoutedProtected>
        ),
    },
    {
        path: '/Propose-form',
        element: (
            <RoutedProtected>
                <Proposed_Form/>
            </RoutedProtected>
        ),
    },
    {
        path: '/Absensi-Page',
        element:( 
            <RoutedProtected>
                <Absent_Page/>
            </RoutedProtected>
        ),    
    },
    {
        path: '/Absensi-Page-Malam',
        element: (
            <RoutedProtected>
                <Absent_Page_Malam/>
            </RoutedProtected>
        ),
    },
    {
        path: '/Absensi-Page-Keluar/:id',
        element: (
            <RoutedProtected>
                <Absent_Page_Out/>
            </RoutedProtected>
        ),
    },
    {
        path: '/Absensi-Page-Keluar-Malam/:id',
        element: (
            <RoutedProtected>
                <Absent_Page_Out_Malam/>
            </RoutedProtected>
        ),
    },
    {
        path: "/form-perbaikan/:id",
        element: (
            <RoutedProtected>
                <Fix_Detail/>
            </RoutedProtected>
        ),
    },
    {
        path: "/form-kendaraan-dinas/:id",
        element: (
            <RoutedProtected>
                <Form_vehicle_Detail/>
            </RoutedProtected>
        ),
    },
    {
        path: "/form-permintaan-barang-baru/:id",
        element: (
            <RoutedProtected>
                <Request_Detail/>
            </RoutedProtected>
        ),
    },
    {
        path: "/form-dana-RPD/:id",
        element: (
            <RoutedProtected>
                <Detail_Form_withdrawl/>
            </RoutedProtected>
        ),
    },
    {
        path: "/form-dana-LPJ/:id",
        element: (
            <RoutedProtected>
                <Detail_Form_Propose/>
            </RoutedProtected>
        ),
    },
    {
        path: "/Dashboard/:level/:role/:role_sp/Cuti-detail/:id",
        element: (
            <RoutedProtected>
                <Cuti_Detail/>
            </RoutedProtected>
        ),
    },
]