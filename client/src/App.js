import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Header, Main, Auth, Book, Order, Basket } from './Component'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined
    }
  }

  _reqLogin = (data) => {
    fetch("http://localhost:8080/users/signIn", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      alert("fail")
    }).then(res => {
      alert("success")
      this.setState({
        user: res
      })
    })
  }

  render() {
    return (
      <Router>
        <Header />
        <Route path='/' exact render={props => (<Main />)}></Route>
        <Route path='/auth' render={props => (<Auth login={this._reqLogin} />)}></Route>
        <Route path='/book' render={props => (<Book />)}></Route>
        <Route path='/order' render={props => (<Order />)}></Route>
        <Route path='/basket' render={props => (<Basket />)}></Route>
      </Router>
    );
  }
}

export default App;