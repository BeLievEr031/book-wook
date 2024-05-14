import { Outlet } from "react-router-dom"

function AuthLayout() {
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <Outlet/>
        </div>
    )
}

export default AuthLayout