import React, { useState } from 'react';
import axios from 'axios';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Button, Form} from 'react-bootstrap';
import '../../pages/static/css/style.css';

import { PortfolioItem } from '../../pages/User';

/* 자격증 입력하는 Form 컴포넌트 */
function Certificate({ userId, setToggle, certificate, setCertificate }){

    const [formCert, setFormCert] = useState();
    const [formCertOrg, setFormCertOrg] = useState();
    const [formCertDate, setFormCertDate] = useState(new Date("2021/03/01"));
    
    var group = 'certificate';

    // 날짜 포맷 함수
    function formDate(_date){
        var date = _date;
        var year = date.getFullYear();
        var month = ("0"+(1+date.getMonth())).slice(-2);
        var day = ("0"+date.getDate()).slice(-2);

        return year+"-"+month+"-"+day;
    }

    // 자격증 Create
    function handleSubmit(e){
        e.preventDefault();
        
        var data = {group: group, certi: formCert, certi_detail: formCertOrg, certi_date: formCertDate, user_id: userId};
        axios.post("http://127.0.0.1:5000/user/portfolio/create", data)
            .then(function (response){
                var formId = response.data.result[0];
                var certDate = formDate(formCertDate);
                var item = [formId, formCert, formCertOrg, certDate];
                var newCertificateList = [...certificate];
                newCertificateList.push(<PortfolioItem item={item}/>);
                setCertificate(newCertificateList);
                setToggle("");
            })
            .catch((err) => {
                console.log("자격증 생성 실패");
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
                    <Button variant="secondary" onClick={function(e){e.preventDefault(); setToggle("")}}>취소</Button>
                </center>
            </Form>
        </>
    )
}

export default Certificate;