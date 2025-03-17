import { Navigate, Outlet } from "react-router-dom";

function Protected() {
    const check = JSON.parse(localStorage.getItem('user'));
    return check ? <Outlet /> : <Navigate to='/login'/>;
}

export default Protected