import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router";
import axios from 'axios';

import { Nav, Card, Row, Col } from 'react-bootstrap';

import './static/css/style.css';
import rachel from './static/images/rachel.gif';

// User.js 의 PortfolioItem 컴포넌트와 유사하나 수정 삭제 버튼이 없어야 해서 새로 생성
function OtherPortfolioItem({ item, group }){
    var item = item;
    var group = group;
    var showItem = [];
    var itemId = item[0];
    
    for (var i=1; i<item.length; i++) {
        showItem.push(<ul>{item[i]}</ul>);
    }

    return(
        <>  
            <Row>
                <Col style={{textAlign: "left"}}>
                    <div>
                        <br />
                        {showItem}
                        <hr />
                    </div>
                    
                </Col>
            </Row>
        </>
    )
}

/* OtherUser 메인 화면 */
function OtherUser(props) {

    const history = useHistory();

    // useState 로 관리
    const [otherUserId, setOtherUserId] = useState();
    const [otherUserName, setOtherUserName] = useState();
    const [otherUserEmail, setOtherUserEmail] = useState();

    const [education, setEducation] = useState();
    const [award, setAward] = useState();
    const [project, setProject] = useState();
    const [certificate, setCertificate] = useState();

    /* 초기 화면 자동 렌더링 useEffect */
    // 해당 사용자의 userId (otherUserId) 받아오기
    useEffect(() => { 
        var data = {userId: props.location.state};
        axios.post("http://127.0.0.1:5000/network/other", data)
            .then(function(response){

                var result = response.data.result;
                console.log(result[0][0]);
                setOtherUserId(result[0][0]);
                setOtherUserName(result[0][1]);
                setOtherUserEmail(result[0][2]);
            })
    }, [])

    // 각 포트폴리오 그룹(학력, 수상내역, 프로젝트, 자격증)을 불러옴
    useEffect(() => {
        if(!otherUserId) return
            var data = {userId: otherUserId};
            axios.post("http://127.0.0.1:5000/user/portfolio/read", data)
            .then(function(response){
                var responseEducation = response.data.education;
                var educationList = [];
                for(var item of responseEducation){
                    educationList.push(<OtherPortfolioItem item={item} group={"education"} />);
                }
                setEducation(educationList);
            })
    }, [otherUserId])

    useEffect(() => {
        if(!otherUserId) return
            var data = {userId: otherUserId};
            axios.post("http://127.0.0.1:5000/user/portfolio/read", data)
            .then(function(response){
                var responseAward = response.data.award;
                var awardList = [];
                for(var item of responseAward){
                    awardList.push(<OtherPortfolioItem item={item} group={"award"} />);
                }
                setAward(awardList);
            })
    }, [otherUserId])

    useEffect(() => {
        if(!otherUserId) return
            var data = {userId: otherUserId};
            axios.post("http://127.0.0.1:5000/user/portfolio/read", data)
            .then(function(response){
                var responseProject = response.data.project;
                var projectList = [];
                for(var item of responseProject){
                    projectList.push(<OtherPortfolioItem item={item} group={"project"} />);
                }
                setProject(projectList);
            })
    }, [otherUserId])

    useEffect(() => {
        if(!otherUserId) return
            var data = {userId: otherUserId};
            axios.post("http://127.0.0.1:5000/user/portfolio/read", data)
            .then(function(response){
                var responseCertificate = response.data.certificate;
                var certificateList = [];
                for(var item of responseCertificate){
                    certificateList.push(<OtherPortfolioItem item={item} group={"certificate"} />);
                }
                setCertificate(certificateList);
            })
    }, [otherUserId])

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
                <Row>
                    <Col md="auto">
                        <Card style={{ width: "18rem" }}>
                            <Card.Img variant="top" src={rachel} />
                            <Card.Body>
                            <Card.Title><strong>{otherUserName}</strong></Card.Title>
                            <Card.Text>
                                {otherUserEmail}<br /><br />
                                엘리스 AI 트랙 1기<br />
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