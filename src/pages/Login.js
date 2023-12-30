import { Form, Input, message } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './Form.css';
import { setUserUuid, setUserId } from '../auth/auth';

const Login = () => {

    const [shouldNavigate, setShouldNavigate] = useState(false);
    const [loading, setLoading] = useState(false);
    const username = useRef();
    const password = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        const authToken = localStorage.getItem('auth');
        if (authToken) {
            navigate('/');
        }
    }, [navigate]);

    useEffect(() => {
        if (shouldNavigate) {
            setLoading(true);
            const timeoutId = setTimeout(() => {
                navigate('/');
                setLoading(false);
            }, 1000);

            return () => clearTimeout(timeoutId);
        }
    }, [shouldNavigate]);

    const loginbtn = (evt) => {
        setLoading(true);

        const user = username.current.input.value;
        const pass = password.current.input.value;

        evt.target.disabled = true;

        if (!user || !pass) {
            message.error('Please enter both username and password.');
            evt.target.disabled = false;
            setLoading(false);
            return;
        }

        fetch('http://localhost:8080/login', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: user, password: pass }),
        })
            .then(response => {
                if (response.status === 401) {
                    message.error('Username and Password are incorrect...');
                    evt.target.disabled = false;
                    setLoading(false);
                    return;
                } else if (!response.ok) {
                    message.error('Login failed due to a server error.');
                    evt.target.disabled = false;
                    setLoading(false);
                    return;
                } else {
                    return response.json();
                }
            })
            .then(data => {
                if (data && data['X-Access-Token']) {
                    const token = data['X-Access-Token'];
                    localStorage.setItem('auth', token);
                    message.success('Successfully Logged In');
                    setUserUuid(data.uuid);
                    setUserId(data.id);
                    setShouldNavigate(true);
                } else {
                    evt.target.disabled = true;
                    return;
                }
            })
            .catch(error => {
                console.error('Login Error:', error);
                message.error('An error occurred during login.');
                evt.target.disabled = false;
                setLoading(false);
                return;
            });
    };

    return (
        <Form className='login-form'>
            <div className="container">
                <div className="row justify-content-center mt-5">
                    <div className="col-sm-12 col-md-8 col-lg-4">
                        <div className="card">
                            <div className="card-body p-4">
                                <img
                                    src=""
                                    alt=""
                                    className="img-fluid mb-4" />
                                <h4 className="mb-4 text-center">Login to Name</h4>

                                {/* Login Form */}
                                <div>
                                    <div className="form-group">
                                        <label htmlFor="username" className="p-1">Username or email address</label>
                                        <Form.Item name={'username'} rules={[
                                            {
                                                required: true,
                                                message: 'Please input your username!',
                                            }
                                        ]}>
                                            <Input
                                                type="text"
                                                id="username"
                                                placeholder="Enter your username or email"
                                                prefix={<UserOutlined className="site-form-item-icon me-2" />}
                                                ref={username}
                                            />
                                        </Form.Item>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="password" className="p-1">Password</label>
                                        <Form.Item name={'password'} rules={[
                                            {
                                                required: true,
                                                message: 'Please input your password!',
                                            }
                                        ]}>
                                            <Input.Password
                                                type="password"
                                                id="password"
                                                placeholder="Enter your password"
                                                prefix={<LockOutlined className="site-form-item-icon me-2" />}
                                                ref={password}
                                            />
                                        </Form.Item>
                                    </div>

                                    <button
                                        type="submit"
                                        onClick={loginbtn}
                                        className={`btn w-100 mt-2 btn-primary btn-block ${loading ? 'disabled' : ''}`}
                                        disabled={loading}
                                    >
                                        Log in
                                    </button>
                                </div>

                                <hr />

                                {/* Additional Options */}
                                <div className="text-center">
                                    <Link to="/forgotpassword" className="d-block d-sm-inline">Forgot password?</Link>
                                    <span className="mx-2 d-none d-sm-inline">|</span>
                                    <Link to="/register" className="d-block d-sm-inline">Sign up for Name</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Form >
    );
};

export default Login;
