import React, { useState } from 'react';
import axios from 'axios';

import { Row, Col, Button, Form} from 'react-bootstrap';
import '../../pages/static/css/style.css';

import { PortfolioItem } from '../../pages/User';

/* 학력 입력하는 Form 컴포넌트 */
function Education({ userId, item, setToggle, education, setEducation }){
    
    const [formSchool, setFormSchool] = useState();
    const [formMajor, setFormMajor] = useState();
    const [formDegree, setFormDegree] = useState();

    // 학위 Radio Button 값 입력
    function handleChangeRadio (e) {
        setFormDegree(e.target.value);
      };      

    // 학력 Create
    function handleSubmit(e){
        e.preventDefault();
        var group = 'education'
        var data = {group: group, school: formSchool, major: formMajor, degree: formDegree, user_id: userId};
        axios.post("http://127.0.0.1:5000/user/portfolio/create", data)
            .then(function (response){
                var formId = response.data.result[0];
                var item = [formId, formSchool, formMajor, formDegree];
                var newEducationList = [...education];
                newEducationList.push(<PortfolioItem item={item} setToggle={(group)=>{setToggle(group);}} group={"education"} />);
                setEducation(newEducationList);
                setToggle("");
            })
            .catch((err) => {
                console.log("학력 생성 실패");
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
                            value="재학"
                            checked={formDegree === "재학" ? true : false}
                            onChange={handleChangeRadio}
                        />
                        <Form.Check
                            type="radio"
                            label="학사"
                            name="bachelor"
                            id="bachelor"
                            value="학사"
                            checked={formDegree === "학사" ? true : false}
                            onChange={handleChangeRadio}
                        />
                        <Form.Check
                            type="radio"
                            label="석사"
                            name="master"
                            id="master"
                            value="석사"
                            checked={formDegree === "석사" ? true : false}
                            onChange={handleChangeRadio}
                        />
                        <Form.Check
                            type="radio"
                            label="박사"
                            name="doctor"
                            id="doctor"
                            value="박사"
                            checked={formDegree === "박사" ? true : false}
                            onChange={handleChangeRadio}
                        />
                    </Col>
                    </Form.Group>
                </fieldset>
                <center>
                    <Button variant="primary" type="submit">확인</Button>
                    <Button variant="secondary" onClick={function(e){e.preventDefault(); setToggle("")}}>취소</Button>
                </center>
            </Form>
        </>
    )
}

export default Education;