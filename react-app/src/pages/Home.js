import React from 'react';
import { Link } from 'react-router-dom';

function Home (){
    return (
        <>
            <h2>Home</h2>
            <hr />
            <ul>
                <li><Link to="/login">로그인</Link></li>
            </ul>
        </>
    );
};

export default Home;