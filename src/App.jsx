import './App.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Content from './Content/Content';
import FormContainer from './Form/FormContainer';
import Profile from './Profile/Profile';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Content/>,
        children: [
            {
                path: '/',
                element: <FormContainer/>,
            },
            {
                path: '/profile',
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
