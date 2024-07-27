import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form as AntdForm } from 'antd';
import css from './FormContainer.module.css';
import Login from './Login/Login';
import {useCookies} from "react-cookie";

const FormContainer = () => {
    const [form] = AntdForm.useForm();
    // const navigate = useNavigate();
    // const [cookies] = useCookies(['UserId']);
    //
    // useEffect(() => {
    //     const userId = cookies.UserId;
    //     if (userId) {
    //         navigate('/taskinvoices/profile');
    //     } else {
    //         navigate('/taskinvoices');
    //     }
    // }, [cookies, navigate]);

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
