import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import css from './Content.module.css';

const Content = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn === 'true') {
            navigate('/profile');
        } else {
            navigate('/');
        }
    }, [navigate]);

    return (
        <div className={css.content}>
            <Outlet />
        </div>
    );
};

export default Content;
