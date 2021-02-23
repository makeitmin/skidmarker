import React, { useState } from 'react';
import Home from "./Home"
import Register from "./Register"

function Login() {
    const [comp, setComp] = useState(Home);
    return (
        <>
            <h2>Login</h2>
            <form>
                Email Address<br/>
                <input type="text" placeholder="Enter Email Address" /><br/>
                Password<br/>
                <input type="password" placeholder="Enter Password" /><br/>
                <button onClick={() => setComp()}>로그인</button>
                <button onClick={() => setComp(Register)}>회원가입</button>
            </form>
        </>
    );
};

export default Login;