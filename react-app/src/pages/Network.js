import React, { Component, useState, useEffect } from 'react';
import { useHistory } from "react-router";
import axios from 'axios';

import { Nav, Card, Row, Col, Button, Form, CardColumns } from 'react-bootstrap'
import './static/css/style.css';

function Network(){

    const history = useHistory();

    const [userId, setUserId] = useState();
    const [users, setUsers] = useState();
    const [network, setNetwork] = useState();

    useEffect(() => { 
        const token = sessionStorage.getItem("token");
        axios.get("http://localhost:5000/auth/info", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(function(response){
            setUserId(response.data.user_id);
        })
    }, [])

    useEffect(() => {
        if(!userId) return
            var data = {userId: userId};
            axios.post("http://localhost:5000/network", data)
            .then(function(response){
                var result = response.data.result;
                setUsers(result);
            }).catch((err)=>{
                console.log("전송 실패");
            })
    }, [userId])

    useEffect(() => {
        if(!users) return
            const network = users.map((user) =>
            <Card>
                <Card.Img variant="top" />
                <Card.Body>
                <Card.Title>{user[1]}</Card.Title>
                <Card.Text>
                    {user[2]}
                </Card.Text>
                </Card.Body>
            </Card>
            );
            setNetwork(network);
    }, [users])
    
    function Logout(){
        sessionStorage.removeItem("token");
        history.replace("/login");
    }

    return (
        <>
            <div class="wrap">
                <Row>
                    <Col md="auto">
                        RacerIn
                    </Col>
                    <Col style={{textAlign: "left"}}>
                        <Nav className="justify-content-end" activeKey="/user">
                            <Nav.Item>
                            <Nav.Link href="/user">메인</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                            <Nav.Link eventKey="/network">네트워크</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                            { sessionStorage.length !== 0 ? 
                                <Nav.Link onClick={Logout} eventKey="/">로그아웃</Nav.Link> : <Nav.Link eventKey="/login">로그인</Nav.Link> 
                            }
                            </Nav.Item>
                        </Nav>
                    </Col>
                </Row>
                <Row>
                    <CardColumns>
                        {network}
                    </CardColumns>
                </Row>
            </div>
        </>
    )
}

export default Network;