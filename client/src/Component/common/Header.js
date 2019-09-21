import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const styles = {
    wrapper: {
        width: '100%',
        borderBottom: '1px solid #919191' //구글에 colorpicker을 검색하여 원하는 색의 선을 Bottom에 놓는다.
    },
    container: {
        width: 1300,
        margin: '0 auto',
        padding: 15,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start'
    }
}

class Header extends Component {
    render() {
        return (
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <Link class="navbar-brand" to="/">Navbar</Link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <Link class="nav-item nav-link active" to="/book">Book<span class="sr-only">(current)</span></Link>
                        <Link class="nav-item nav-link" to="/auth">Login</Link>
                        <Link class="nav-item nav-link" to="/auth">Auth</Link>
                        {
                            
                        }
                        <Link class="nav-item nav-link" to="#">Logout</Link>
                        <Link class="nav-item nav-link" to="/basket">Basket</Link>
                        <Link class="nav-item nav-link" to="/order">Order</Link>
                    </div>
                </div>
            </nav>
            // <div style = {styles.wrapper}>
            //     <div style = {styles.container}>
            //     <h1>도서구매</h1>
            //     <ul>
            //         <li><Link to = "/">Main</Link></li>
            //         <li><Link to = "/auth">Auth</Link></li>
            //         <li><Link to = "/book">Book</Link></li>
            //         <li><Link to = "/order">Order</Link></li>
            //         <li><Link to = "/basket">Basket</Link></li>
            //     </ul>
            //     </div>
            // </div>
        );
    }
}

export default Header;