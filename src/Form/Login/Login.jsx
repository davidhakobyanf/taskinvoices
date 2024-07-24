import React, {useReducer, useEffect, useContext} from 'react';
import css from "./Login.module.css";
import { Button, Form, Input, message } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {NameContext} from "../../context/NameContext";
const initialState = {
    loading: false,
    success: false,
    error: null,
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'REQUEST_START':
            return { ...state, loading: true, error: null };
        case 'REQUEST_SUCCESS':
            return { ...state, loading: false, success: true, error: null };
        case 'REQUEST_ERROR':
            return { ...state, loading: false, success: false, error: action.error };
        default:
            return state;
    }
};

const Login = ({ form }) => {
    // const useName = () => useContext(NameContext);
    //
    // const { name, setName } = useName();
    const [state, dispatch] = useReducer(reducer, initialState);
    const navigate = useNavigate();

    useEffect(() => {
        if (state.loading) {
            message.loading({ content: 'Logging in...', key: 'login' });
        }
        if (state.success) {
            message.success({ content: 'Login was successful', key: 'login', duration: 2 });
            navigate('/profile');
        }
        if (state.error) {
            message.error({ content: state.error, key: 'login', duration: 2 });
        }
    }, [state.loading, state.success, state.error, navigate]);

    const handleLogin = async (values) => {
        dispatch({ type: 'REQUEST_START' });

        try {
            const response = await fetch('https://bever-aca-assignment.azurewebsites.net/users', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            const users = data.value;
            const user = users.find(user => user.Name === values.name && user.Password === values.password);

            if (user) {
                console.log('Login successful');
                localStorage.setItem('isLoggedIn', true);
                localStorage.setItem('userName', values.name);
                dispatch({ type: 'REQUEST_SUCCESS' });
            } else {
                console.log('Login failed: Invalid credentials');
                dispatch({ type: 'REQUEST_ERROR', error: 'Invalid login credentials.' });
            }
        } catch (error) {
            console.error('Error:', error);
            dispatch({ type: 'REQUEST_ERROR', error: 'An error occurred during login.' });
        }
    };

    return (
        <div className={css.right}>
            <h2 className={css.title}>Login</h2>
            <Form form={form} onFinish={handleLogin} className={css.form}>
                <Form.Item
                    name="name"
                    rules={[
                        { required: true, message: 'Please enter your name' },
                    ]}
                >
                    <Input placeholder="Name" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please enter your password' }]}
                >
                    <Input.Password
                        placeholder="Enter your password"
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                </Form.Item>
                <Button type="primary" htmlType="submit" disabled={state.loading}>
                    Login
                </Button>
            </Form>
        </div>
    );
};

export default Login;
