import { Outlet, Navigate } from "react-router-dom";
// eslint-disable-next-line react/prop-types
const RoutedProtected = ({ children }) => {
    const storedidAkun = localStorage.getItem('id_akun');
    if (!storedidAkun) {
        return <Navigate to="/" />;
        }

        return <> {children || <Outlet/>}</>
};

export default RoutedProtected