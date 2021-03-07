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

function PortfolioItem({ item, group }){
    var item = item;
    var group = group;
    var showItem = [];
    var itemId = item[0];

    for (var content of item) {
        showItem.push(<PortfolioItemContent content={content} />);
    }

    function deleteHandler(e){
        e.preventDefault();
        var data = {id: itemId, group: group}
        axios.post("http://localhost:5000/user/portfolio/delete", data)
            .then(function(response){
                console.log(response.data);
                window.location.reload();
            })
            .catch((err) => {
                console.log("삭제 실패");
            })
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
                    <Button variant="primary" onClick={function(e){e.preventDefault(); props.setToggle(group);}}>수정</Button><br />
                    <Button variant="danger" onClick={deleteHandler}>삭제</Button>
                </Col>
            </Row>
        </>
    )
}

/* User 메인 화면 */
function OtherUser() {

    const history = useHistory();

    // useState 로 관리
    const [otherUserId, setOtherUserId] = useState();

    const [education, setEducation] = useState();
    const [award, setAward] = useState();
    const [project, setProject] = useState();
    const [certificate, setCertificate] = useState();

    /* 초기 화면 자동 렌더링 useEffect */
    // 해당 사용자의 userId 받아오기
    useEffect(() => { 
        axios.get("http://localhost:5000/network/user")
        .then(function(response){
            setOtherUserId(response.data.user_id);
        })
        .catch((err)=>{
            console.log("전송 실패");
        })
    }, [])

    // 각 포트폴리오 그룹(학력, 수상내역, 프로젝트, 자격증)을 불러옴
    useEffect(() => {
        if(!otherUserId) return
            var data = {userId: userId};
            axios.post("http://localhost:5000/user/portfolio/read", data)
            .then(function(response){
                var responseEducation = response.data.education;
                var educationList = [];
                for(var item of responseEducation){
                    educationList.push(<PortfolioItem item={item} group={"education"} />);
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
                    awardList.push(<PortfolioItem item={item} group={"award"} />);
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
                    projectList.push(<PortfolioItem item={item} group={"project"} />);
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
                    certificateList.push(<PortfolioItem item={item} group={"certificate"} />);
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
                            </Card.Body>
                        </Card><br />
                        <Card>
                            <Card.Body>
                            <Card.Title>수상이력</Card.Title>
                            <Card.Text>
                                { award }<br />
                            </Card.Text>
                            </Card.Body>
                        </Card><br />
                        <Card>
                            <Card.Body>
                            <Card.Title>프로젝트</Card.Title>
                            <Card.Text>
                                { project }<br />
                            </Card.Text>
                            </Card.Body>
                        </Card><br />
                        <Card>
                            <Card.Body>
                            <Card.Title>자격증</Card.Title>
                            <Card.Text>
                                { certificate }<br />
                            </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>  
        </>
    );
}

export default OtherUser;