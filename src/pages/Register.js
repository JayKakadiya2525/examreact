import { Form, Input, message } from 'antd';
import { useRef } from 'react';
import { Link } from "react-router-dom";
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import './Form.css';

const Register = () => {


    const registerbtn = (evt) => {

        const user = username.current.input.value;
        const pass = password.current.input.value;
        const mail = email.current.input.value;

        evt.target.disabled = true;

        if (!user || !pass || !mail) {
            evt.target.disabled = false;
            return;
        }

        fetch('http://localhost:8080/register', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: user, password: pass, email: mail }),
        })
            .then((res) => {
                if (res.status === 409) {
                    message.error("Username or Email is already exist");
                    evt.target.disabled = false;
                } else if (res.ok) {
                    message.success("Register Successfully. Please Check Your Email.");
                    setTimeout(() => window.location.href = '/Login', 3000);
                } else if (res.status === 500) {
                    message.error("Register Failed");
                    evt.target.disabled = false;
                }
                return res.json();
            });
    }

    let username = useRef();
    let email = useRef();
    let password = useRef();

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
                                    className="img-fluid mb-4"
                                />
                                <h4 className="mb-4 text-center">Sign in to Name</h4>

                                {/* Login Form */}
                                <div>
                                    <div className="form-group">
                                        <label htmlFor="username" className="p-1">Username</label>
                                        <Form.Item name={'username'} rules={[
                                            {
                                                required: true,
                                                min: 3
                                            }
                                        ]}>
                                            <Input
                                                type="text"
                                                id="username"
                                                placeholder="Enter your username"
                                                prefix={<UserOutlined className="site-form-item-icon me-2" />}
                                                ref={username}
                                            />
                                        </Form.Item>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email" className="p-1">Email</label>
                                        <Form.Item name={'email'} rules={[
                                            {
                                                required: true,
                                            }
                                        ]}>
                                            <Input
                                                type="email"
                                                id="email"
                                                placeholder="Enter your email"
                                                prefix={<LockOutlined className="site-form-item-icon me-2" />}
                                                ref={email}
                                            />
                                        </Form.Item>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="password" className="p-1">Password</label>
                                        <Form.Item name={'password'} rules={[
                                            {
                                                required: true,
                                                min: 8,
                                            }
                                        ]}>
                                            <Input
                                                type="password"
                                                id="password"
                                                placeholder="Enter your password"
                                                prefix={<MailOutlined className="site-form-item-icon me-2" />}
                                                ref={password}
                                            />
                                        </Form.Item>
                                    </div>

                                    <button
                                        type="submit"
                                        onClick={registerbtn}
                                        className="btn w-100 mt-2 btn-primary btn-block">
                                        Sign in
                                    </button>
                                </div>

                                <hr />

                                {/* Additional Options */}
                                <div className="text-center">
                                    <Link to="/login" className="d-block d-sm-inline">Login for Name</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </Form >
    );
};

export default Register;
