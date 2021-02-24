import React, { useState } from 'react'
import '../css/Login.css'
import logo from '../img/logo.jpg';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { ShakeHorizontal  } from 'reshake'

export default function Login({ setToken }) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();

    


    const handleSubmit = async e => {
        e.preventDefault();
        axios.post('http://admin.kodmu.com:4000/admin/users/login', {
            username: username,
            password: password
        }).then((response) => {
            if (response.status == '200') {
                localStorage.setItem('token', response.data.token);
                window.location.href = '/';
            }
        }, (error) => {
            console.log(error)
            if (error.response.status == '401') {
                setError(error.response.data.msg)
            } else {
                setError(error)
            }
        });
    }

    return (
        <>
            <div className="login-containner margin-top">
                <div className="card-header avatar">
                    <img src={logo} />
                </div>
                <Form onSubmit={handleSubmit}>
                    <div className="login-body">
                        <div className="login-panel">
                            <FormGroup>
                                <Label for="exampleEmail">User</Label>
                                <Input type="text" name="user" id="user" placeholder="User" onChange={e => setUserName(e.target.value)} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="examplePassword">Password</Label>
                                <Input type="password" name="password" id="password" placeholder="password" onChange={e => setPassword(e.target.value)} />
                            </FormGroup>
                        </div>
                        <Button type="submit">Submit</Button>
                    </div>
                </Form>
                <div className="card-footer shake">
                <ShakeHorizontal  dur="4">{error}</ShakeHorizontal >
                </div>
            </div>
        </>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}
