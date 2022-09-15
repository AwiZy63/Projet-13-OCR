import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.style.css';
import bankLogo from '../../assets/argentBankLogo.png';
import { connect } from 'react-redux';
import { removeUserDataAction } from '../../store/userData/userData.actions';

function Navbar({ userData, removeUserData }) {
    // console.log(userData)
    const { isLogged } = userData;
    const { firstName } = userData;

    const navigate = useNavigate();

    const handleLogout = () => {
        removeUserData()
        navigate('/')
    }

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
            {isLogged ?
                <div>
                    <Link className="main-nav-item" to={'/profile'}>
                        <i className="fa fa-user-circle"></i>
                        {firstName}
                    </Link>
                    <button className="main-nav-item" onClick={() => handleLogout()} >
                        <i className="fa fa-sign-out"></i>
                        Sign Out
                    </button>
                </div>
                :
                <div>
                    <Link className="main-nav-item" to={'/signin'}>
                        <i className="fa fa-user-circle"></i>
                        Sign In
                    </Link>
                </div>
            }
        </nav>
    )
}

const userDataState = (state) => {
    return {
        userData: state.userData
    }
}

const userDataDispatch = (dispatch) => {
    return {
        removeUserData: () => dispatch(removeUserDataAction())
    }
}

export default connect(userDataState, userDataDispatch)(Navbar);