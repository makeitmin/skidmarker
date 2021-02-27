import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Home from "./Home"
import Register from "./Register"

import { Nav, Card, Row, Col, Button, Form } from 'react-bootstrap'
import './Login.css'

function Login(props){

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [token, setToken] = useState();
    
    useEffect(() => {
        window.sessionStorage.setItem("token", token)
    }, [token])

    function handleChangeEmail(e){
        setEmail(e.target.value);
    }

    function handleChangePassword(e){
        setPassword(e.target.value);
    }

    function handleOnClick(){
        props.history.push("/register");
    }

    function handleSubmit(e) {
        e.preventDefault();
        var data = {user_email: email, user_password: password};
        
        axios.post("http://localhost:5000/auth/login", data)
            .then(function (response){
                var res = response.data.access_token
                setToken(res);
                props.history.replace("/home");
            })
            .catch((err) => {
                console.log("전송 에러");
            })
        
    }
    
    return (
        <>
            <Row>
            <Col md="auto">
                RacerIn
            </Col>
            <Col style={{textAlign: "left"}}>
                <Nav className="justify-content-end" activeKey="/home">
                    <Nav.Item>
                    <Nav.Link href="/home">메인</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                    <Nav.Link eventKey="/portfolio">네트워크</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                    <Nav.Link eventKey="/logout">로그아웃</Nav.Link>
                </Nav.Item>
            </Nav>
            </Col>
            </Row>
            <center>
                <form onSubmit={handleSubmit} action="/home">
                    
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="text" onChange={handleChangeEmail} placeholder="Enter Email Address" />
                    
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" onChange={handleChangePassword} placeholder="Enter Password" /><br />
                    
                    <Button variant="primary" type="submit">로그인</Button><br /><br />
                    <Button variant="light" onClick={handleOnClick}>회원가입</Button>
                                
                </form>
            </center>
        </>
    );
};

export default Login;