import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import "./index.css";
import FormContainer from "./Form/FormContainer";


const router = createBrowserRouter([
    {
        path: "/client",
        element: <ClientTable/>,
    },
    {
        path: "/client/:clientId",
        element: <ClientDashboard/>,
    },
    {
        path: "/",
        element: <FormContainer/>,
    },
    {
        path: "/profile",
        element: <Profile/>,
        children: [
            {
                path: "/profile/dashboard",
                element: <Dashboard/>,
            }
        ]
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
                <RouterProvider router={router}/>
    </React.StrictMode>
);