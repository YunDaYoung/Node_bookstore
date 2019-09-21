import React, { Component } from 'react';
//import axios from 'axios';

class Auth extends Component {
    constructor(props) {
        super(props);

        this.signUp = this.signUp.bind(this);
        this.signIn = this.signIn.bind(this);
    }

    signUp = () => {
        const data = {
            memberID : this.state.signUpMemberID, 
            memberPassword : this.state.signUpMemberPassword,
            memberName : this.state.signUpMemberName
        }
        fetch("http://localhost:8080/users/signUp", {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(data), 
        }).then((response) => {
            return response.json();
        }).then(res => { 
            if(res.result){
                alert("Success");
            }
            else{
                alert("fail");
            }
        })
    }

    signIn = () => {
        const data = {
            memberID : this.state.loginMemberID, 
            memberPassword : this.state.loginMemberPassword
        }
        this.props.login(data);
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    state = {
        signUpMemberID : "",
        signUpMemberPassword : "",
        signUpMemberName : "",

        loginMemberID : "",
        loginMemberPassword : ""
    }

    render() {
        return (
            <div>
                <div>
                    <h3>회원가입</h3>
                    <input name="signUpMemberID" placeholder="아이디" type="text" value={this.state.signUpMemberID} onChange={this.handleChange}></input><br />
                    <input name="signUpMemberPassword" placeholder="비밀번호" type="password" value={this.state.signUpMemberPassword} onChange={this.handleChange}></input><br />
                    <input name="signUpMemberName" placeholder="이름" type="text" value={this.state.signUpMemberName} onChange={this.handleChange}></input><br />
                    <button name="signUp" type = "button" onClick = {this.signUp}>회원가입</button><br/>
                </div>
                <div>
                    <h3>로그인</h3>
                    <input name="loginMemberID" placeholder="아이디" type="text" value={this.state.loginMemberID} onChange={this.handleChange}></input><br />
                    <input name="loginMemberPassword" placeholder="비밀번호" type="password" value={this.state.loginMemberPassword} onChange={this.handleChange}></input><br />
                    <button name="sighIn" type = "button" onClick = {this.signIn}>로그인</button><br/>
                </div>
            </div>
        );
    }
}

export default Auth;