import React from 'react'
import { Link } from 'react-router-dom';
import { logout } from '../../actions/securityActions';
import { connect } from 'react-redux';
import PropTypes from "prop-types";

const Header = ({logout, security}) => {

    const {validToken, user} = security;
    const signout = () => {
        logout();
        window.location.href="/";
    }
    const userIsNotAuthenticated = (
        <>
            <ul className="navbar-nav ml-auto">
                <li className="nav-item float-right">
                    <Link className="nav-link " to="register">
                    <i class="fas fa-user-plus"></i>
                    </Link>
                </li>
                <li className="nav-item float-right">
                    <Link className="nav-link" to="login">
                    <i class="fas fa-sign-in-alt"></i>Login
                    </Link>
                </li>
            </ul>
        </>
    )

    const userIsAuthenticated=(
        <>
            <ul className="navbar-nav mr-auto">
                <li className="nav-item float-right">
                    <Link className="nav-link" to="/dashboard">
                    <i class="fas fa-list-alt"></i>
                    </Link>
                </li>
            </ul>
            <ul className="navbar-nav ml-auto">
                <li className="nav-item float-right">
                    <Link className="nav-link " to="/dashboard">
                    <i className="fas fa-user-circle mr1">
                        {user.fullName}
                    </i>    
                    </Link>
                </li>
                <li className="nav-item float-right">
                    <Link className="nav-link" onClick={signout} to="#">
                        Logout<i class="fas fa-sign-out-alt"></i>
                    </Link>
                </li>
            </ul>
        </>
    )

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
            <div className="container">
                <Link className="navbar-brand" to="/">
                Personal Project Management Tool <i class="fas fa-seedling"></i>
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                    <span className="navbar-toggler-icon" />
                </button>

                <div className="collapse navbar-collapse" id="mobile-nav">
                    {(validToken)? userIsAuthenticated : userIsNotAuthenticated}
                </div>
            </div>
        </nav>
    )
}

Header.propTypes = {
    logout: PropTypes.func.isRequired,
    security: PropTypes.object.isRequired
}

export default connect(null, {logout})(Header);