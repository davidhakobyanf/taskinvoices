import React from 'react';
import { Form as AntdForm } from 'antd';
import css from './FormContainer.module.css';
import Login from "./Login/Login";
const FormContainer = () => {
    const [form] = AntdForm .useForm();
    return (
        <div className={css.container}>
            <div className={css.block}>
                <div className={css.left}></div>
                    <Login form={form}  />
            </div>
        </div>
    );
};

export default FormContainer;