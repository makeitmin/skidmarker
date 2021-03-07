import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router";
import axios from 'axios';

import { Nav, Row, Col, Button, Form } from 'react-bootstrap'
import './static/css/login.css'

/* 로그인 Form 컴포넌트 */
function Login(){

    const history = useHistory();

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
        history.push("/register");
    }

    // 로그인 요청
    function handleSubmit(e) {
        e.preventDefault();
        var data = {user_email: email, user_password: password};
        
        axios.post("http://127.0.0.1:5000/auth/login", data)
            .then(function (response){
                var res = response.data.access_token
                setToken(res);
                history.replace("/user");
                console.log("로그인 성공");
            })
            .catch((err) => {
                console.log("로그인 실패");
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
                    <Nav.Link eventKey="/login">로그인</Nav.Link>
                </Nav.Item>
            </Nav>
            </Col>
            </Row>
            <center>
                <form onSubmit={handleSubmit} action="/home">
                    
                    <Form.Label style={{textAlign: "left"}}>Email</Form.Label>
                    <Form.Control type="text" onChange={handleChangeEmail} placeholder="이메일을 입력하세요" />
                    
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" onChange={handleChangePassword} placeholder="비밀번호를 입력하세요" /><br />
                    
                    <Button variant="primary" type="submit">로그인</Button><br /><br />
                    <Button variant="light" onClick={handleOnClick}>회원가입</Button>
                                
                </form>
            </center>
        </>
    );
};

export default Login;