import React, { useState } from 'react';
import axios from 'axios';

function Portfolio() {
    const [comp, setComp] = useState(Home);
    const [school, setSchool] = useState();
    const [major, setMajor] = useState();
    const [degree, setDegree] = useState();

    const [prize, setPrize] = useState();
    const [prizeDetail, setPrizeDetail] = useState();

    const [project, setProject] = useState();
    const [projectDetail, setProjectDetail] = useState();

    const [cert, setCert] = useState();
    const [certInst, setCertInst] = useState();
    const [certDate, setCertDate] = useState(new Date());

    const [startDate, setStartDate] = useState(new Date("2014/02/08"));
    const [endDate, setEndDate] = useState(new Date("2014/02/10"));

    

    function handleChangeSchool(e){
        setSchool(e.target.value);
    }

    function handleChangeMajor(e){
        setMajor(e.target.value);
    }

    function handleChangeDegree(e){
        setDegree(e.target.value);
    }

    function handleChangePrize(e){
        setPrize(e.target.value);
    }

    function handleChangePrizeDetail(e){
        setPrizeDetail(e.target.value);
    }

    function handleChangeProject(e){
        setProject(e.target.value);
    }

    function handleChangeProjectDetail(e){
        setProjectDetail(e.target.value);
    }

    function handleChangeCert(e){
        setCert(e.target.value);
    }

    function handleChangeCertInst(e){
        setCertInst(e.target.value);
    }

    function dateRangePicker(){

        return (
            <>
                <DatePicker
                    selected={startDate}
                    onChange={date => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                />
                <DatePicker
                    selected={endDate}
                    onChange={date => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                />
            </>
        );
    }

    function dateSinglePicker(){

        return (
            <DatePicker selected={certDate} onChange={date => setCertDate(date)} />
          );
    }

    function handleSubmit(e) {
        e.preventDefault();
        var data = {
            user_school: school, user_major: major, user_degree: degree,
            project: school, projectDetail: major,
            cert: cert, certInst: certInst, certDate: certDate,
            user_school: school, user_major: major, user_degree: degree,

        };
        
        axios.post("http://localhost:5000/auth/login", data)
            .then(function (){
                console.log(data);
            })
            .catch((err) => {
                console.log('전송 에러');
            })
    }

    return (
        <>
            <h2>Portfolio</h2>
            <hr />
            <form onSubmit={handleSubmit}>
                <h4>학력</h4>
                학교명<br/>
                <input type="text" onChange={handleChangeSchool} placeholder="학교를 입력하세요" /><br/>
                전공정보<br/>
                <input type="text" onChange={handleChangeMajor} placeholder="전공을 입력하세요" /><br/>
                최종학력<br/>
                <input type="radio" onChange={handleChangeDegree} value="학사" checked="checked">학사</input><br/>
                <input type="radio" onChange={handleChangeDegree} value="석사">석사</input><br/>
                <input type="radio" onChange={handleChangeDegree} value="박사">박사</input><br />
                
                <h4>수상이력</h4>
                수상내역<br/>
                <input type="text" onChange={handleChangePrize} placeholder="수상내역을 입력하세요" /><br/>
                상세내역<br/>
                <input type="text" onChange={handleChangePrizeDetail} placeholder="상세내역을 입력하세요" /><br/>
                
                <h4>프로젝트</h4>
                프로젝트명<br/>
                <input type="text" onChange={handleChangeProject} placeholder="프로젝트명을 입력하세요" /><br/>
                상세내역<br/>
                <input type="text" onChange={handleChangeProjectDetail} placeholder="상세내역을 입력하세요" /><br/>
                프로젝트 수행기간<br/>
                <input type="text" onClick={datePicker} placeholder="프로젝트 수행기간을 입력하세요" /><br/>
                
                <h4>자격증</h4>
                자격증명<br/>
                <input type="text" onChange={handleChangeCert} placeholder="자격증명을 입력하세요" /><br/>
                공급기관<br/>
                <input type="text" onClick={handleChangeCertInst} placeholder="공급기관을 입력하세요" /><br/>
                프로젝트 수행기간<br/>
                <input type="text" onClick={dateSinglePicker} placeholder="취득일자를 입력하세요" /><br/>

                <button type="submit">등록</button>
            </form>
        </>
    );
};

export default Portfolio;