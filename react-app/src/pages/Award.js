import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Nav, Card, Row, Col, Button, Form } from 'react-bootstrap'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import './style.css';
import rachel from './rachel.gif';

export function Award(props){

    const [formAward, setFormAward] = useState();
    const [formAwardDetail, setFormAwardDetail] = useState();

    function handleSubmit(e){
        e.preventDefault();
        var formHeader = 'award'
        var data = {form_header: formHeader, award: formAward, award_detail: formAwardDetail, user_id: props.userId};
        axios.post("http://localhost:5000/user/portfolio/create", data)
            .then(function (response){
                var newAward = [formAward, formAwardDetail];
                var newAwardList = [...props.award];
                newAwardList.push(<li>{newAward[0]}{"  "}{newAward[1]}</li>);
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

