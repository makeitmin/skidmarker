import React, { useState } from 'react';
import axios from 'axios';

import { Nav, Card, Row, Col, Button, Form } from 'react-bootstrap'
import './Login.css'

function Register(props){
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [name, setName] = useState();

    function handleChangeEmail(e){
        setEmail(e.target.value);
    }

    function handleChangePassword(e){
        setPassword(e.target.value);
    }

    function handleChangeName(e){
        setName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        var data = {user_email: email, user_password: password};
        
        axios.post("http://localhost:5000/auth/register", data)
            .then(function (){
                console.log("전송 성공");
            })
            .catch((err) => {
                console.log('전송 에러');
            })
        props.history.push("/login");
    }

    return (
        <>
            <Row>
            <Col md='auto'>
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
                <form onSubmit={handleSubmit}>

                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="text" onChange={handleChangeEmail} placeholder="Enter Email Address" />
                    
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" onChange={handleChangePassword} placeholder="Enter Password" />

                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" onChange={handleChangeName} placeholder="Enter Name" /><br />
                    
                    <Button type="submit">회원가입</Button>
                                
                </form>
            </center>
        </>
    );
};

export default Register;