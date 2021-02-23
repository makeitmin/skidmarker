import React, { useState } from 'react';

function Register(){
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    function handleChangeEmail(e){
        setEmail(e.target.value);
    }

    function handleChangePassword(e){
        setPassword(e.target.value);
    }

    return (
        <>
            <h2>Register</h2>
            <form>
                Email Address<br/>
                <input type="text" onChange={handleChangeEmail} placeholder="Enter Email Address" /><br/>
                Password<br/>
                <input type="password" onChange={handleChangePassword} placeholder="Enter Password" /><br/>
                <button type="submit">가입하기</button>
            </form>
        </>
    );
};

export default Register;