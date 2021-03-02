import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Nav, Card, Row, Col, Button, Form } from 'react-bootstrap'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import './style.css';
import rachel from './rachel.gif';

function EducationForm(props){
    const [school, setSchool] = useState();
    const [major, setMajor] = useState();
    const [degree, setDegree] = useState();
    return(
        <>
            <Form>
                <Form.Control type="text" placeholder="학교 이름"/><br />
                <Form.Control type="text" placeholder="전공"/><br />
                {['radio'].map((type) => (
                    <div key={`default-${type}`} className="mb-3">
                    <Form.Check 
                        type={type}
                        id={`student`}
                        inline label={`재학중`}
                    />
                    <Form.Check 
                        type={type}
                        id={`master`}
                        inline label={`학사졸업`}
                    />
                    <Form.Check 
                        type={type}
                        id={`phd`}
                        inline label={`석사졸업`}
                    />
                    <Form.Check 
                        type={type}
                        inline label={`박사졸업`}
                    />
                    </div>
                ))}
                <center>
                    <Button variant="primary" type="submit">확인</Button>
                    <Button variant="secondary" type="submit">취소</Button>
                </center>
            </Form>
        </>
    )
}

function AwardForm(){

    const [award, setAward] = useState();
    const [awardDetail, setAwardDetail] = useState();

    return(
        <>
            <Form>
                <Form.Control type="text" placeholder="수상내역" /><br />
                <Form.Control type="text" placeholder="상세내역" /><br />
                <center>
                    <Button variant="primary" type="submit">확인</Button>
                    <Button variant="secondary" type="submit">취소</Button>
                </center>
            </Form>
        </>
    )
}

function ProjectForm(){

    const [project, setProject] = useState();
    const [projectDetail, setProjectDetail] = useState();

    const [startDate, setStartDate] = useState(new Date("2014/02/08"));
    const [endDate, setEndDate] = useState(new Date("2014/02/10"));

    return(
        <>
            <Form>
                <Form.Control type="text" placeholder="프로젝트 제목" /><br />
                <Form.Control type="text" placeholder="상세내역" /><br />
                <DatePicker
                    selected={startDate}
                    onChange={date => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                />
                <DatePicker
                    selected={endDate}
                    onChange={date => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                /><br />
                <center>
                    <Button variant="primary" type="submit">확인</Button>
                    <Button variant="secondary" type="submit">취소</Button>
                </center>
            </Form>
        </>
    )
}

function CertiForm(){

    const [cert, setCert] = useState();
    const [certInst, setCertInst] = useState();
    const [certDate, setCertDate] = useState(new Date());

    return(
        <>
            <Form>
                <Form.Control type="text" placeholder="수상내역" /><br />
                <Form.Control type="text" placeholder="주최기관" /><br />
                <DatePicker selected={certDate} onChange={date => setCertDate(date)} /><br />
                <center>
                    <Button variant="primary" type="submit">확인</Button>
                    <Button variant="secondary" type="submit">취소</Button>
                </center>
            </Form>
        </>
    )
}

function Home(props){
    
    const [userId, setUserId] = useState();
    const [userEmail, setUserEmail] = useState();
    const [userName, setUserName] = useState();

    const [toggle, setToggle] = useState();

    var inputForm = null;
    
    if (toggle === "education"){
        inputForm = (<EducationForm />);

    } else if (toggle === "award"){
        inputForm = (<AwardForm />);

    } else if (toggle === "project"){
        inputForm = (<ProjectForm />);

    } else if (toggle === "certi") {
        inputForm = (<CertiForm />);

    }

    useEffect(() => { 
        const token = sessionStorage.getItem("token");
        axios.get("http://localhost:5000/protected", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(function(response){
            setUserId(response.data.user_id);
            setUserEmail(response.data.user_email);
            setUserName(response.data.user_name);
        })
    }, [])

    function logout(){
        sessionStorage.removeItem("token");
        props.history.replace("/login");
    }

    return (
        <>
        <div class="wrap">
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
                    { sessionStorage.length != 0 ? <Nav.Link onClick={logout} eventKey="/">로그아웃</Nav.Link> : <Nav.Link eventKey="/login">로그인</Nav.Link> }
                    
                </Nav.Item>
            </Nav>
            </Col>
            </Row>
            <Row>
                <Col md="auto">
                    <Card style={{ width: "18rem" }}>
                        <Card.Img variant="top" src={rachel} />
                        <Card.Body>
                        <Card.Title><strong>{userName}</strong></Card.Title>
                        <Card.Text>
                            {userEmail}<br /><br />
                            엘리스 AI 트랙 1기<br />
                            - 미니 프로젝트 1팀<br />
                            - 레이서 포트폴리오 2팀
                        </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Body>
                        <Card.Title>학력</Card.Title>
                        <Card.Text>
                            OO 대학교<br />
                            YYY 학부 XXXX 학과<br />
                        </Card.Text>
                        {
                            toggle=="education" ? <EducationForm /> : ""
                        }
                        </Card.Body>
                        <Button variant="light" onClick={(e)=>{setToggle("education");}}>추가하기</Button>
                    </Card><br />
                    <Card>
                        <Card.Body>
                        <Card.Title>수상이력</Card.Title>
                        <Card.Text>
                            ABCDEF 대회<br />
                            AA BB CC DD EE FF<br />
                        </Card.Text>
                        {
                            toggle=="award" ? <AwardForm /> : ""
                        }
                        </Card.Body>
                        <Button variant="light" onClick={(e)=>{setToggle("award");}}>추가하기</Button>
                    </Card><br />
                    <Card>
                        <Card.Body>
                        <Card.Title>프로젝트</Card.Title>
                        <Card.Text>
                            레이서 포트폴리오 프로젝트<br />
                            포트폴리오 웹서비스 구현 및 배포<br />
                            2021-02-27 ~ 2021-03-04<br />
                        </Card.Text>
                        {
                            toggle=="project" ? <ProjectForm /> : ""
                        }
                        </Card.Body>
                        <Button variant="light" onClick={(e)=>{setToggle("project");}}>추가하기</Button>
                    </Card><br />
                    <Card>
                        <Card.Body>
                        <Card.Title>자격증</Card.Title>
                        <Card.Text>
                            WWW 자격증<br />
                            RRR GGGG DDDD SSSSS<br />
                            2021-02-27<br />
                        </Card.Text>
                        {
                            toggle=="certi" ? <CertiForm /> : ""
                        }
                        </Card.Body>
                        <Button variant="light" onClick={(e)=>{setToggle("certi");}}>추가하기</Button>
                    </Card>
                </Col>
            </Row>
            
          </div>  
        </>
    );
};

export default Home;