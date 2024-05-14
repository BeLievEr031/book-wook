import AuthLayout from "@/Layouts/AuthLayout";
import DashboardLayout from "@/Layouts/DashboardLayout";
import Dashboard from "@/pages/Dashboard/Dashboard";
import AddBook from "@/pages/Dashboard/page/AddBook";
import DisplayBook from "@/pages/Dashboard/page/DisplayBook";
import Home from "@/pages/Home/Home";
import { Login } from "@/pages/Login/Login";
import Order from "@/pages/Order/Order";
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
        path: "/",
        element: <DashboardLayout />,
        children: [
            {
                path: "dashboard",
                element: <Dashboard />,
                children: [
                    {
                        path: "",
                        element: <DisplayBook />
                    },
                    {
                        path: "add-book",
                        element: <AddBook />
                    }
                ]
            },
            {
                path: "order",
                element: <Order />
            },
        ]
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