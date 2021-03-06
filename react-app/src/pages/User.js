import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router";
import axios from 'axios';

import Certificate from '../components/user/Certificate';
import Award from '../components/user/Award';
import Project from '../components/user/Project';
import Education from './../components/user/Education';

import { Nav, Card, Row, Col, Button} from 'react-bootstrap';
import './static/css/style.css';
import rachel from './static/images/rachel.gif';

/* 포트폴리오 항목들을 UI에 맞게 보여주기 위한 컴포넌트 */
// 포트폴리오 항목 1개 안의 1개 요소를 표시(ex. 엘리스대학교)
export function PortfolioItemContent(props){
    var content = props.content;
    return(
        <>
            {content}<br />
        </>
    )
}

// PortfolioItemContent를 반복하여 포트폴리오 항목 1개의 배열을 표시 (ex. 엘리스대학교 컴퓨터공학과 학사졸업)
export function PortfolioItem(props){
    var item = props.item;
    var showItem = [];
    for (var content of item) {
        var data = [{content: content}];
        showItem.push(<PortfolioItemContent content={content} />);
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
                    <Button variant="primary">수정</Button><br />
                    <Button variant="danger">삭제</Button>
                </Col>
            </Row>
        </>
    )
}

/* User 메인 화면 */
function User() {

    const history = useHistory();

    // useState 로 관리
    const [userId, setUserId] = useState();
    const [userEmail, setUserEmail] = useState();
    const [userName, setUserName] = useState();

    const [education, setEducation] = useState();
    const [award, setAward] = useState();
    const [project, setProject] = useState();
    const [certificate, setCertificate] = useState();

    const [toggle, setToggle] = useState();

    var inputForm = null;
    
    // 각 toggle 값에 따라 열어주는 폼이 상이
    if (toggle === "education"){
        inputForm = (<Education userId={userId} setToggle={setToggle} setEducation={setEducation} education={education} />);
    
    } else if (toggle === "award"){
        inputForm = (<Award userId={userId} setToggle={setToggle} setAward={setAward} award={award} />);

    } else if (toggle === "project"){
        inputForm = (<Project userId={userId} setToggle={setToggle} setProject={setProject} project={project} />);

    } else if (toggle === "certificate") {
        inputForm = (<Certificate userId={userId} setToggle={setToggle} setCertificate={setCertificate} certificate={certificate} />);

    }

    /* 초기 화면 자동 렌더링 useEffect */
    // 사용자 인증
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

    // 사용자 인증이 완료되었을 때 각 포트폴리오 그룹(학력, 수상내역, 프로젝트, 자격증)을 불러옴
    useEffect(() => {
        if(!userId) return
            var data = {userId: userId};
            axios.post("http://localhost:5000/user/portfolio/read", data)
            .then(function(response){
                var responseEducation = response.data.education;
                var educationList = [];
                for(var item of responseEducation){
                    educationList.push(<PortfolioItem item={item}/>);
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
                for(var item of responseAward){
                    awardList.push(<PortfolioItem item={item}/>);
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
                for(var item of responseProject){
                    projectList.push(<PortfolioItem item={item}/>);
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
                for(var item of responseCertificate){
                    certificateList.push(<PortfolioItem item={item}/>);
                }
                setCertificate(certificateList);
            })
    }, [userId])

    // 로그아웃 함수
    function Logout(){
        sessionStorage.removeItem("token");
        history.push("/login");
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
                                { education }<br />
                            </Card.Text>
                            {
                                toggle === "education" ? inputForm : "" // toggle === education 이면 Education 컴포넌트 호출
                            }
                            </Card.Body>
                            <Button variant="light" onClick={function (e){ setToggle("education"); }}>추가하기</Button>
                        </Card><br />
                        <Card>
                            <Card.Body>
                            <Card.Title>수상이력</Card.Title>
                            <Card.Text>
                                { award }<br />
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
                                { project }<br />
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
                                { certificate }<br />
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
}

export default User;