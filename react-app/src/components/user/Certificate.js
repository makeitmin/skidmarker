import React, { useState } from 'react';
import axios from 'axios';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Button, Form} from 'react-bootstrap';
import '../../pages/static/css/style.css';

import { PortfolioItem } from '../../pages/User';

function Certificate(props){

    const [formCert, setFormCert] = useState();
    const [formCertOrg, setFormCertOrg] = useState();
    const [formCertDate, setFormCertDate] = useState(new Date("2021/03/01"));
    
    function formDate(_date){
        var date = _date;
        var year = date.getFullYear();
        var month = ("0"+(1+date.getMonth())).slice(-2);
        var day = ("0"+date.getDate()).slice(-2);

        return year+"-"+month+"-"+day;
    }

    function handleSubmit(e){
        e.preventDefault();
        var formHeader = 'certi'
        var data = {form_header: formHeader, certi: formCert, certi_detail: formCertOrg, certi_date: formCertDate, user_id: props.userId};
        axios.post("http://localhost:5000/user/portfolio/create", data)
            .then(function (response){
                var certDate = formDate(formCertDate);
                var item = [formCert, formCertOrg, certDate];
                var newCertificateList = [...props.certificate];
                newCertificateList.push(<PortfolioItem item={item}/>);
                props.setCertificate(newCertificateList);
                props.setToggle("");
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
                    <Button variant="secondary" onClick={function(e){props.setToggle("")}}>취소</Button>
                </center>
            </Form>
        </>
    )
}
export default Certificate;