import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Nav, Card, Row, Col, Button, Form } from 'react-bootstrap'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import './style.css';
import rachel from './rachel.gif';

export function Project(props){

    const [formProject, setFormProject] = useState();
    const [formProjectDetail, setFormProjectDetail] = useState();

    const [formStartDate, setFormStartDate] = useState(new Date("2021/03/01"));
    const [formEndDate, setFormEndDate] = useState(new Date("2021/03/02"));

    function formDate(date){
        var date = date;
        var year = date.getFullYear();
        var month = ("0"+(1+date.getMonth())).slice(-2);
        var day = ("0"+date.getDate()).slice(-2);

        return year+"-"+month+"-"+day;
    }

    function handleSubmit(e){
        e.preventDefault();
        var formHeader = 'project'
        var data = {form_header: formHeader, project: formProject, project_detail: formProjectDetail, project_start: formStartDate, project_end: formEndDate, user_id: props.userId};
        axios.post("http://localhost:5000/user/portfolio/create", data)
            .then(function (response){
                var startDate = formDate(formStartDate);
                var endDate = formDate(formEndDate);
                console.log(response.data);
                var newProject = [formProject, formProjectDetail, startDate, endDate];
                var newProjectList = [...props.project];
                newProjectList.push(<li>{newProject[0]}{"  "}{newProject[1]}{"  "}{newProject[2]}{"  "}{newProject[3]}</li>);
                props.setProject(newProjectList);
                props.setToggle("");
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
                    <Button variant="secondary" onClick={function(e){props.setToggle("")}}>취소</Button>
                </center>
            </Form>
        </>
    )
}