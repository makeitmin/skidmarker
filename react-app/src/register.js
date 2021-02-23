import React, {Component} from 'react'; 
import axios from 'axios';

class Register extends Component{ 
    constructor(props) { 
        super(props); 
        this.state = { email: "", password: "" }; 
    }; 
    handleChangeEmail = (e) => { 
        this.setState({ [e.target.email]: e.target.value }); 
    };
    handleChangePassword = (e) => { 
        this.setState({ [e.target.password]: e.target.value }); 
    }; 
    
    handleClick = (e) => { 
        console.log(this.state.email, this.state.password);
        var data = {'user_email': this.state.email, 'user_password': this.state.password}
        axios.post('http://localhost:3000/auth/register', data)
    }

    render(){ 
        return ( 
            <form> 
                <h2>회원가입</h2> 
                <input type="text" placeholder="Email Address" name="email" onChange={this.handleChangeEmail}/> 
                <input type="password" placeholder="Password" name="password" onChange={this.handleChangePassword}/> 
                <button type="button" onClick={this.handleOnClick}>회원가입</button> 
            </form> 
        ); 
    }; 
} export default Register;