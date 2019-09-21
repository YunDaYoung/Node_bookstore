import React, { Component } from 'react';

class Book extends Component {
    constructor() {
        super();

        this.registerBook = this.registerBook.bind(this);
    }

    registerBook = () => {
        fetch("http://localhost:8080/book", {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(this.state), 
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

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    state = {
        bookName : "",
        bookPrice : "",
        bookAuthor : "",
    }

    render() {
        return (
            <div>
                <input name="bookName" placeholder="책 이름" type="text" value={this.state.bookName} onChange={this.handleChange}></input><br />
                <input name="bookPrice" placeholder="책 가격" type="text" value={this.state.bookPrice} onChange={this.handleChange}></input><br />
                <input name="bookAuthor" placeholder="작가" type="text" value={this.state.bookAuthor} onChange={this.handleChange}></input><br />
                <button name="bookRegister" type = "button" onClick = {this.registerBook}>책정보 등록</button><br/>
            </div>
        );
    }
}

export default Book;