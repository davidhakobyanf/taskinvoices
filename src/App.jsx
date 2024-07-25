import './App.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Content from './Content/Content';
import FormContainer from './Form/FormContainer';
import Profile from './Profile/Profile';

const router = createBrowserRouter([
    {
        path: '/taskinvoices',
        element: <Content/>,
        children: [
            {
                path: '/taskinvoices',
                element: <FormContainer/>,
            },
            {
                path: '/taskinvoices/profile',
                element: (
                    <Profile/>
                ),
            },
        ],
    },
]);

function App() {
    return (

        <RouterProvider router={router}/>

    );
}

export default App;
