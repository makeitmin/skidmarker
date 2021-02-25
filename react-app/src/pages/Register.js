import React, { useState } from 'react';
import axios from 'axios';

function Register(){
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    function handleChangeEmail(e){
        setEmail(e.target.value);
    }

    function handleChangePassword(e){
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        var data = {user_email: email, user_password: password};
        
        axios.post("http://localhost:5000/auth/register", data)
            .then(function (){
                console.log(data);
            })
            .catch((err) => {
                console.log('전송 에러');
            })
    }

    return (
        <>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                Email Address<br/>
                <input type="text" onChange={handleChangeEmail} placeholder="Enter Email Address" /><br/>
                Password<br/>
                <input type="password" onChange={handleChangePassword} placeholder="Enter Password" /><br/>
                <button type='submit'>가입하기</button>
            </form>
        </>
    );
};

export default Register;