import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Nav, Card, Row, Col, Button, Form } from 'react-bootstrap';

import { Certificate } from './Certificate';
import { Award } from './Award';
import { Project } from './Project';
import { Education } from './Education';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import './style.css';
import rachel from './rachel.gif';

function PortfolioItemContents(props){
    
    var content = props.content;

    return(
        <>
            {content}<br />
        </>
    )
}

function PortfolioItemList(props){
    var item = props.item;
    var showItem = [];
    for (var content of item) {
        showItem.push(<PortfolioItemContents content={content}/>);
    }

    return(
        <>  
            <Row>
                <Col style={{textAlign: "left"}}>
                    <div>
                        {showItem}
                        <hr />
                    </div>
                    
                </Col>
                <Col md="auto" style={{textAlign: "right"}}>
                    <a href="#">Edit</a>
                </Col>
            </Row>
        </>
    )
}

function User(props){

    const [userId, setUserId] = useState();
    const [userEmail, setUserEmail] = useState();
    const [userName, setUserName] = useState();

    const [education, setEducation] = useState();
    const [award, setAward] = useState();
    const [project, setProject] = useState();
    const [certificate, setCertificate] = useState();

    const [toggle, setToggle] = useState();

    var inputForm = null;
    
    if (toggle === "education"){
        inputForm = (<Education userId={userId} setToggle={setToggle} setEducation={setEducation} education={education} />);
    
    } else if (toggle === "award"){
        inputForm = (<Award userId={userId} setToggle={setToggle} setAward={setAward} award={award} />);

    } else if (toggle === "project"){
        inputForm = (<Project userId={userId} setToggle={setToggle} setProject={setProject} project={project} />);

    } else if (toggle === "certificate") {
        inputForm = (<Certificate userId={userId} setToggle={setToggle} setCertificate={setCertificate} certificate={certificate} />);

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

    useEffect(() => {
        if(!userId) return
            var data = {userId: userId};
            axios.post("http://localhost:5000/user/portfolio/read", data)
            .then(function(response){
                var responseEducation = response.data.education;
                var educationList = [];
                for (var item of responseEducation) {
                    educationList.push(<PortfolioItemList item={item}/>);
                }
                setEducation(educationList);
            })
    }, [userId])

    useEffect(() => {
        if(!userId) return
            var data = {userId: userId};
            axios.post("http://localhost:5000/user/portfolio/read", data)
            .then(function(response){
                var responseAward = response.data.award;
                var awardList = [];
                for (var item of responseAward) {
                    awardList.push(<PortfolioItemList item={item}/>);
                }
                
                setAward(awardList);
            })
    }, [userId])

    useEffect(() => {
        if(!userId) return
            var data = {userId: userId};
            axios.post("http://localhost:5000/user/portfolio/read", data)
            .then(function(response){
                var responseProject = response.data.project;
                var projectList = [];
                for (var item of responseProject) {
                    projectList.push(<PortfolioItemList item={item}/>);
                }
                setProject(projectList);
            })
    }, [userId])

    useEffect(() => {
        if(!userId) return
            var data = {userId: userId};
            axios.post("http://localhost:5000/user/portfolio/read", data)
            .then(function(response){
                var responseCertificate = response.data.certificate;
                var certificateList = [];
                for (var item of responseCertificate) {
                    certificateList.push(<PortfolioItemList item={item}/>);
                }
                setCertificate(certificateList);
            })
    }, [userId])

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
                    <Nav.Link eventKey="/network">네트워크</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                    { sessionStorage.length !== 0 ? <Nav.Link onClick={logout} eventKey="/">로그아웃</Nav.Link> : <Nav.Link eventKey="/login">로그인</Nav.Link> }
                    
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
                        <Card.Title>학력</Card.Title><br />
                        <Card.Text>
                            {
                                education
                            }<br />
                        </Card.Text>
                        {
                            toggle === "education" ? inputForm : ""
                        }
                        </Card.Body>
                        <Button variant="light" onClick={function (e){ setToggle("education"); }}>추가하기</Button>
                    </Card><br />
                    <Card>
                        <Card.Body>
                        <Card.Title>수상이력</Card.Title><br />
                        <Card.Text>
                            {
                                award
                            }<br />
                        </Card.Text>
                        {
                            toggle === "award" ? inputForm : ""
                        }
                        </Card.Body>
                        <Button variant="light" onClick={function (e){ setToggle("award"); }}>추가하기</Button>
                    </Card><br />
                    <Card>
                        <Card.Body>
                        <Card.Title>프로젝트</Card.Title><br />
                        <Card.Text>
                            {
                                project
                            }<br />
                        </Card.Text>
                        {
                            toggle === "project" ? inputForm : ""
                        }
                        </Card.Body>
                        <Button variant="light" onClick={function (e){ setToggle("project"); }}>추가하기</Button>
                    </Card><br />
                    <Card>
                        <Card.Body>
                        <Card.Title>자격증</Card.Title><br />
                        <Card.Text>
                            {
                                certificate
                            }<br />
                        </Card.Text>
                        {
                            toggle === "certificate" ? inputForm : ""
                        }
                        </Card.Body>
                        <Button variant="light" onClick={function (e){ setToggle("certificate"); }}>추가하기</Button>
                    </Card>
                </Col>
            </Row>
            
          </div>  
        </>
    );
};

export default User;
