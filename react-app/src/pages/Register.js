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

    function handleClick(){
        var data = {user_email: email, user_password: password};
        axios.post("http://localhost:5000/auth/register", data)
            .then(console.log('전송 성공!'))
            .catch((err) => {
                console.log('전송 에러');
            })
    }

    return (
        <>
            <h2>Register</h2>
            <form>
                Email Address<br/>
                <input type="text" onChange={handleChangeEmail} placeholder="Enter Email Address" /><br/>
                Password<br/>
                <input type="password" onChange={handleChangePassword} placeholder="Enter Password" /><br/>
                <button onClick={handleClick}>가입하기</button>
            </form>
        </>
    );
};

export default Register;