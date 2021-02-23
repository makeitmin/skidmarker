import React from 'react';

const Register = () => {
    return (
        <>
            <h2>Register</h2>
            <form>
                Email Address<br/>
                <input type="text" placeholder="Enter Email Address" /><br/>
                Password<br/>
                <input type="password" placeholder="Enter Password" /><br/>
                <button type="submit">제출</button>
            </form>
        </>
    );
};

export default Register;