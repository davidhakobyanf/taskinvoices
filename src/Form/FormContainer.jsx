import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form as AntdForm } from 'antd';
import css from './FormContainer.module.css';
import Login from './Login/Login';

const FormContainer = () => {
    const [form] = AntdForm.useForm();
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
        <div className={css.container}>
            <div className={css.block}>
                <div className={css.left}></div>
                <Login form={form} />
            </div>
        </div>
    );
};

export default FormContainer;
