import AuthLayout from "@/Layouts/AuthLayout";
import DashboardLayout from "@/Layouts/DashboardLayout";
import Home from "@/pages/Home/Home";
import { Login } from "@/pages/Login/Login";
import { SignUp } from "@/pages/SignUp/Signup";
import {
    createBrowserRouter,
} from "react-router-dom";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/dashboard",
        element: <DashboardLayout />,
    },
    {
        path: "/auth",
        element: <AuthLayout />,
        children: [{
            path: "signup",
            element: <SignUp />
        },
        {
            path: "login",
            element: <Login />
        }
        ]
    },
]);

export default router;