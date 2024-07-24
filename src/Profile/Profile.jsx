import React, {useContext} from 'react';
import {NameContext} from "../context/NameContext";
import Navbar from "./Navbar/Navbar";
const Profile = () => {

    const userNameFromLocalStorage = localStorage.getItem('userName') || name;

    return (
        <div>
            <Navbar name={userNameFromLocalStorage}/>
        </div>
    );
};

export default Profile;