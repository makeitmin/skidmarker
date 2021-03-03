import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Nav, Card, Row, Col, Button, Form } from 'react-bootstrap'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import './style.css';
import rachel from './rachel.gif';

function EducationForm(props){
    
    const [formSchool, setFormSchool] = useState();
    const [formMajor, setFormMajor] = useState();
    const [formDegree, setFormDegree] = useState();

    function handleChangeRadio (e) {
        setFormDegree(e.target.value);
      };      

    function handleSubmit(e){
        e.preventDefault();
        var formHeader = 'education'
        var data = {form_header: formHeader, school: formSchool, major: formMajor, degree: formDegree, user_id: props.userId};
        axios.post("http://localhost:5000/user/portfolio/create", data)
            .then(function (response){
                console.log(response.data);
            })
            .catch((err) => {
                console.log("전송 에러");
            })
    }

    return(
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Group as={Row} controlId="formHorizontalSchool">
                    <Form.Label column sm={2}>
                    학교명
                    </Form.Label>
                    <Col sm={10}>
                    <Form.Control type="school" onChange={function (e){setFormSchool(e.target.value)}} placeholder="학교명 입력" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formHorizontalMajor">
                    <Form.Label column sm={2}>
                    전공명
                    </Form.Label>
                    <Col sm={10}>
                    <Form.Control type="major" onChange={function (e){setFormMajor(e.target.value)}} placeholder="전공명 입력" />
                    </Col>
                </Form.Group>
                
                <fieldset>
                    <Form.Group as={Row}>
                    <Form.Label as="legend" column sm={2}>
                        학위
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Check
                            type="radio"
                            label="재학"
                            name="student"
                            id="student"
                            value="student"
                            checked={formDegree === "student" ? true : false}
                            onChange={handleChangeRadio}
                        />
                        <Form.Check
                            type="radio"
                            label="학사"
                            name="bachelor"
                            id="bachelor"
                            value="bachelor"
                            checked={formDegree === "bachelor" ? true : false}
                            onChange={handleChangeRadio}
                        />
                        <Form.Check
                            type="radio"
                            label="석사"
                            name="master"
                            id="master"
                            value="master"
                            checked={formDegree === "master" ? true : false}
                            onChange={handleChangeRadio}
                        />
                        <Form.Check
                            type="radio"
                            label="박사"
                            name="doctor"
                            id="doctor"
                            value="doctor"
                            checked={formDegree === "doctor" ? true : false}
                            onChange={handleChangeRadio}
                        />
                    </Col>
                    </Form.Group>
                </fieldset>

                <Form.Group as={Row}>
                    <Col sm={{ span: 10, offset: 2 }}>
                    <Button type="submit">확인</Button>
                    </Col>
                </Form.Group>
            </Form>
        </>
    )
}

function AwardForm(props){

    const [formAward, setFormAward] = useState();
    const [formAwardDetail, setFormAwardDetail] = useState();

    function handleSubmit(e){
        e.preventDefault();
        var formHeader = 'award'
        var data = {form_header: formHeader, award: formAward, award_detail: formAwardDetail, user_id: props.userId};
        axios.post("http://localhost:5000/user/portfolio/create", data)
            .then(function (response){
                console.log(response.data);
            })
            .catch((err) => {
                console.log("전송 에러");
            })
    }

    return(
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Control type="text" onChange={function (e){setFormAward(e.target.value)}} placeholder="수상내역 입력" /><br />
                <Form.Control type="text" onChange={function (e){setFormAwardDetail(e.target.value)}} placeholder="상세내역 입력" /><br />
                <center>
                    <Button variant="primary" type="submit">확인</Button>
                    <Button variant="secondary" type="submit">취소</Button>
                </center>
            </Form>
        </>
    )
}

function ProjectForm(props){

    const [formProject, setFormProject] = useState();
    const [formProjectDetail, setFormProjectDetail] = useState();

    const [formStartDate, setFormStartDate] = useState(new Date("2014/02/08"));
    const [formEndDate, setFormEndDate] = useState(new Date("2014/02/10"));

    function handleSubmit(e){
        e.preventDefault();
        var formHeader = 'project'
        var data = {form_header: formHeader, project: formProject, project_detail: formProjectDetail, project_start: formStartDate, project_end: formEndDate, user_id: props.userId};
        axios.post("http://localhost:5000/user/portfolio/create", data)
            .then(function (response){
                console.log(response.data);
            })
            .catch((err) => {
                console.log("전송 에러");
            })
    }

    return(
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Control type="text" onChange={function (e){setFormProject(e.target.value)}} placeholder="프로젝트명" /><br />
                <Form.Control type="text" onChange={function (e){setFormProjectDetail(e.target.value)}} placeholder="상세내역" /><br />
                {formProjectDetail}
                <DatePicker
                    selected={formStartDate}
                    onChange={date => setFormStartDate(date)}
                    selectsStart
                    dateFormat="yyyy-MM-dd"
                    startDate={formStartDate}
                    endDate={formEndDate}
                />
                <DatePicker
                    selected={formEndDate}
                    onChange={date => setFormEndDate(date)}
                    selectsEnd
                    dateFormat="yyyy-MM-dd"
                    startDate={formStartDate}
                    endDate={formEndDate}
                    minDate={formStartDate}
                /><br />
                <center>
                    <Button variant="primary" type="submit">확인</Button>
                    <Button variant="secondary" type="submit">취소</Button>
                </center>
            </Form>
        </>
    )
}

function CertiForm(props){

    const [formCert, setFormCert] = useState();
    const [formCertOrg, setFormCertOrg] = useState();
    const [formCertDate, setFormCertDate] = useState(new Date("2014/02/10"));
    
    function handleSubmit(e){
        e.preventDefault();
        var formHeader = 'certi'
        var data = {form_header: formHeader, certi: formCert, certi_detail: formCertOrg, certi_date: formCertDate, user_id: props.userId};
        axios.post("http://localhost:5000/user/portfolio/create", data)
            .then(function (response){
                console.log(response.data);
            })
            .catch((err) => {
                console.log("전송 에러");
            })
    }

    return(
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Control type="text" onChange={function (e){setFormCert(e.target.value)}} placeholder="자격증명" /><br />
                <Form.Control type="text" onChange={function (e){setFormCertOrg(e.target.value)}} placeholder="공급기관" /><br />
                <DatePicker selected={formCertDate} dateFormat="yyyy-MM-dd" onChange={date => setFormCertDate(date)} /><br />
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

    const [school, setSchool] = useState();
    const [major, setMajor] = useState();
    const [degree, setDegree] = useState();

    const [award, setAward] = useState();
    const [awardDetail, setAwardDetail] = useState();

    const [toggle, setToggle] = useState();

    var inputForm = null;
    
    if (toggle === "education"){
        inputForm = (<EducationForm userId={userId} />);
    
    } else if (toggle === "award"){
        inputForm = (<AwardForm userId={userId} />);

    } else if (toggle === "project"){
        inputForm = (<ProjectForm userId={userId} />);

    } else if (toggle === "certi") {
        inputForm = (<CertiForm userId={userId} />);

    }

    useEffect(() => { 
        const token = sessionStorage.getItem("token");
        axios.get("http://localhost:5000/auth/info", {
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
                            toggle === "education" ? inputForm : ""
                        }
                        </Card.Body>
                        <Button variant="light" onClick={function (e){ setToggle("education"); }}>추가하기</Button>
                    </Card><br />
                    <Card>
                        <Card.Body>
                        <Card.Title>수상이력</Card.Title>
                        <Card.Text>
                            ABCDEF 대회<br />
                            AA BB CC DD EE FF<br />
                        </Card.Text>
                        {
                            toggle === "award" ? inputForm : ""
                        }
                        </Card.Body>
                        <Button variant="light" onClick={function (e){ setToggle("award"); }}>추가하기</Button>
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
                            toggle === "project" ? inputForm : ""
                        }
                        </Card.Body>
                        <Button variant="light" onClick={function (e){ setToggle("project"); }}>추가하기</Button>
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
                            toggle === "certi" ? inputForm : ""
                        }
                        </Card.Body>
                        <Button variant="light" onClick={function (e){ setToggle("certi"); }}>추가하기</Button>
                    </Card>
                </Col>
            </Row>
            
          </div>  
        </>
    );
};

export default Home;
