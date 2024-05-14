import AuthLayout from "@/Layouts/AuthLayout";
import DashboardLayout from "@/Layouts/DashboardLayout";
import Book from "@/pages/Books/Book";
import Dashboard from "@/pages/Dashboard/Dashboard";
import AddBook from "@/pages/Dashboard/page/AddBook";
import DisplayBook from "@/pages/Dashboard/page/DisplayBook";
import Genre from "@/pages/Genre/Genre";
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
                path:"genre",
                element:<Genre/>
            },
            {
                path: "order",
                element: <Order />
            },
            {
                path: "books",
                element: <Book />
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