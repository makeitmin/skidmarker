import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import axios from 'axios';

import { Nav, Card, Row, Col, CardColumns, InputGroup, FormControl, Button } from 'react-bootstrap'
import './static/css/style.css';

function Network(){

    const history = useHistory();

    const [userId, setUserId] = useState();
    const [users, setUsers] = useState();
    const [searchUsers, setSearchUsers] = useState();
    const [network, setNetwork] = useState();

    const [otherUserId, setOtherUserId] = useState();

    const[keyword, setKeyword] = useState();

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
            const network = users.map((user) =>{
                setOtherUserId(user[0]);
                return(
                    <>
                        <Card>
                            <Card.Img variant="top" />
                            <Card.Body>
                            <Card.Title>
                                <Link to={{ 
                                    pathname: "/other", 
                                    state: user[0]
                                }}>
                                {user[1]}
                                </Link></Card.Title>
                            <Card.Text>
                                {user[2]}
                            </Card.Text>
                            </Card.Body>
                        </Card>
                    </>
                );
            })
            setNetwork(network);
    }, [users])

    
    function goToUserDetail(otherUserId){
        history.push({
            pathname:"/other",
            state:{
                key: otherUserId
             }
           });
    }

    function search(e){
        e.preventDefault();
        setKeyword(e.target.value);
    }

    function handleSearch(){
        var data = {keyword: keyword};
        axios.post("http://localhost:5000/network/search", data)
        .then(function(response){
            setUsers(response.data.result);
        })
        .catch((err) => {
            console.log("검색 실패");
        })
    }

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
                            <Nav.Link href="/network">네트워크</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                            { sessionStorage.length !== 0 ? 
                                <Nav.Link onClick={Logout} eventKey="/">로그아웃</Nav.Link> : <Nav.Link eventKey="/login">로그인</Nav.Link> 
                            }
                            </Nav.Item>
                        </Nav>
                    </Col>
                </Row>
                <Row className='justify-content-md-center'>
                    <div class="search">
                        <InputGroup className="mb-3">
                            <FormControl
                            placeholder="사용자 검색"
                            aria-label="사용자 검색"
                            aria-describedby="basic-addon2"
                            onChange={search}
                            />
                            <InputGroup.Append>
                            <Button variant="outline-secondary" onClick={handleSearch}>검색</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </div>
                </Row>
                <Row className='justify-content-md-center'>
                    <div class="cards">
                        <CardColumns>
                            {network}
                        </CardColumns>
                    </div>
                </Row>
            </div>
        </>
    )
}

export default Network;