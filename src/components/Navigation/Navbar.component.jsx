import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.style.css';
import bankLogo from '../../assets/argentBankLogo.png';

export default function Navbar() {
    return (
        <nav className="main-nav">
            <Link className="main-nav-logo" to={'/'}>
                <img
                    className="main-nav-logo-image"
                    src={bankLogo}
                    alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            <div>
                <Link class="main-nav-item" to={'#'}>
                    <i class="fa fa-user-circle"></i>
                    Tony
                </Link>
                <Link class="main-nav-item" to={'#'}>
                    <i class="fa fa-sign-out"></i>
                    Sign Out
                </Link>
            </div>
            <div>
                <Link className="main-nav-item" to={'/signin'}>
                    <i className="fa fa-user-circle"></i>
                    Sign In
                </Link>
            </div>
        </nav>
    )
}
