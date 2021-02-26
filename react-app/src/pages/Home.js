import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Nav, Card, Row, Col, Button } from 'react-bootstrap'

import rachel from './rachel.gif';

function Home(){
    
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
            <Row>
                <Col md='auto'>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={rachel} />
                        <Card.Body>
                        <Card.Title>하성민</Card.Title>
                        <Card.Text>
                            엘리스 AI 트랙 1기
                        </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Body>
                        <Card.Title>학력</Card.Title>
                        <Card.Text>
                            ...
                        </Card.Text>
                        </Card.Body>
                        <Button variant="light">추가하기</Button>
                    </Card><br />
                    <Card>
                        <Card.Body>
                        <Card.Title>수상이력</Card.Title>
                        <Card.Text>
                            ...
                        </Card.Text>
                        </Card.Body>
                        <Button variant="light">추가하기</Button>
                    </Card><br />
                    <Card>
                        <Card.Body>
                        <Card.Title>프로젝트</Card.Title>
                        <Card.Text>
                            ...
                        </Card.Text>
                        </Card.Body>
                        <Button variant="light">추가하기</Button>
                    </Card><br />
                    <Card>
                        <Card.Body>
                        <Card.Title>자격증</Card.Title>
                        <Card.Text>
                            ...
                        </Card.Text>
                        </Card.Body>
                        <Button variant="light">추가하기</Button>
                    </Card>
                </Col>
            </Row>
            
            
        </>
    );
};

export default Home;