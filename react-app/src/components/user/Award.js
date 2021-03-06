import React, { useState } from 'react';
import axios from 'axios';

import { Button, Form } from 'react-bootstrap';
import '../../pages/static/css/style.css';

import { PortfolioItem } from '../../pages/User';

function Award({ userId, item, itemId, setItemId, setToggle, award, setAward }){

    const [formAward, setFormAward] = useState();
    const [formAwardDetail, setFormAwardDetail] = useState();
    
    var group = "award";

    function updateHandler(e){
        e.preventDefault();
        var data = {id: itemId, group: group, name: formAward, detail: formAwardDetail}
        axios.post("http://localhost:5000/user/portfolio/update", data)
            .then(function(response){
                console.log(response.data);
                window.location.reload();
            })
            .catch((err) => {
                console.log("업데이트 실패");
            })
    }

    function handleSubmit(e){
        e.preventDefault();
        var data = {group: group, award: formAward, award_detail: formAwardDetail, user_id: userId};
        axios.post("http://localhost:5000/user/portfolio/create", data)
        .then(function (response){
            var item = [formAward, formAwardDetail];
            var newAwardList = [...award];
            newAwardList.push(<PortfolioItem item={item}/>);
            setAward(newAwardList);
            setToggle("");
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
                    <Button variant="secondary" onClick={function(e){e.preventDefault(); setToggle("")}}>취소</Button>
                </center>
            </Form>
        </>
    )
}

export default Award;