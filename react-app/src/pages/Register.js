import React, { useState } from 'react';
import axios from 'axios';

import { Nav, Row, Col, Button, Form, Alert } from 'react-bootstrap'
import './static/css/login.css'

function Warning(){
    const warning = ['danger'].map((variant, idx) => (
        <Alert key={idx} variant={variant}>
          비밀번호가 일치하지 않습니다. 다시 입력해주세요.
        </Alert>
    ));
    return(
        <>
            <div class="warning">
                {warning}
            </div>
        </>
    );
}

/* 회원가입 Form 컴포넌트 */
function Register(props){
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordCheck, setPasswordCheck] = useState();
    const [name, setName] = useState();

    function handleChangeEmail(e){
        setEmail(e.target.value);
    }

    function handleChangePassword(e){
        setPassword(e.target.value);
        setPasswordCheck(e.target.value);
    }

    function handleChangePasswordCheck(e){
        setPasswordCheck(e.target.value);
    }

    function handleChangeName(e){
        setName(e.target.value);
    }

    // 회원가입 요청
    function handleSubmit(e) {
        e.preventDefault();
        var data = {user_email: email, user_password: password, user_name: name};
        
        axios.post("http://localhost:5000/auth/register", data)
            .then(function (){
                console.log("회원가입 성공");
            })
            .catch((err) => {
                console.log('회원가입 실패');
            })
        props.history.push("/login");
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
                <form onSubmit={handleSubmit}>

                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="text" onChange={handleChangeEmail} placeholder="Enter Email Address" />
                    
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" onChange={handleChangePassword} placeholder="Enter Password" />

                    <Form.Label>Password Check</Form.Label>
                    <Form.Control type="password" onChange={handleChangePasswordCheck} placeholder="Enter Password" />
                    {password !== passwordCheck ? <Warning /> : ""}

                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" onChange={handleChangeName} placeholder="Enter Name" /><br />
                    
                    <Button type="submit">회원가입</Button>
                                
                </form>
            </center>
        </>
    );
};

export default Register;