import React, { useState } from 'react';
import axios from 'axios';

import Home from "./Home"
import Register from "./Register"

function Login() {
    const [comp, setComp] = useState(Home);
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
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                Email Address<br/>
                <input type="text" onChange={handleChangeEmail} placeholder="Enter Email Address" /><br/>
                Password<br/>
                <input type="password" onChange={handleChangePassword} placeholder="Enter Password" /><br/>
                <button type="submit">로그인</button>
                <button onClick={() => setComp(Register)}>회원가입</button>
            </form>
        </>
    );
};

export default Login;