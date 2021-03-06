import React, { useState } from 'react';
import axios from 'axios';

import { Button, Form } from 'react-bootstrap';
import '../../pages/static/css/style.css';

import { PortfolioItem } from '../../pages/User';

function Award(props){

    const [formAward, setFormAward] = useState();
    const [formAwardDetail, setFormAwardDetail] = useState();
    
    function handleSubmit(e){
        e.preventDefault();
        var formHeader = "award";
        var data = {form_header: formHeader, award: formAward, award_detail: formAwardDetail, user_id: props.userId};
        axios.post("http://localhost:5000/user/portfolio/create", data)
        .then(function (response){
            var item = [formAward, formAwardDetail];
            var newAwardList = [...props.award];
            newAwardList.push(<PortfolioItem item={item}/>);
            props.setAward(newAwardList);
            props.setToggle("");
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
                    <Button variant="secondary" onClick={function(e){props.setToggle("")}}>취소</Button>
                </center>
            </Form>
        </>
    )
}

export default Award;