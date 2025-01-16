import { Outlet, Navigate } from "react-router-dom";

const id = localStorage.getItem('id');
// eslint-disable-next-line react/prop-types
const RoutedProtected = ({ children }) => {
if (!id) {
    return <Navigate to="/" />;
    }

    return <> {children || <Outlet/>}</>
};

export default RoutedProtected