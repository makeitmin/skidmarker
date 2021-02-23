import React from 'react';

const Home = () => {
    return (
        <>
            <h2>Home</h2>
            <hr />
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/login">로그인</Link></li>
            </ul>
        </>
    );
};

export default Home;