import React from 'react';
import { Navbar, Nav, Dropdown, Image } from 'react-bootstrap';
import { Link, useHistory, useLocation } from 'react-router-dom';

const NavBar = (props) => {
    const location = useLocation();
    const history = useHistory();
    return (
        <Navbar sticky="top" style={{backgroundColor: '#fff', height: 100}}>
            <Nav className="mr-auto">
                <Navbar.Brand className="title-logo">Bank.</Navbar.Brand>
                <Link 
                    to="/" 
                    className={`nav-link ${location.pathname === '/' && 'active'}`}
                    >
                        Home
                </Link>
                <Link 
                    to="/stock"
                    className={`nav-link ${location.pathname === '/stock' && 'active'}`}
                    >
                        Stock
                </Link>
                <Link 
                    to="/options"
                    className={`nav-link ${location.pathname === '/options' && 'active'}`}
                    >
                        Options
                </Link>

            </Nav>
        </Navbar>
    );
};

export default NavBar;