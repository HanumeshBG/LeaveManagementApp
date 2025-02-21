import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => { 
    return (
        <nav className="navbar navbar-expand-sm bg-dark fixed-top" id="navbar">
            <div className="container-fluid">
                <Link className="navbar-brand text-light" to="/home/dashboard">Home</Link>
                <div className="navbar-header">
                    <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#myNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    
                </div>
                <div className="collapse navbar-collapse navbar  justify-content-end" id="myNavbar">
                    <ul className="navbar-nav">
                        <li className="nav-item" id="homeLeaveDetailBtn"><Link className="nav-link text-light" to="/home/leaveDetails"> Leave Details</Link></li>
                        <li className="nav-item" id="homeApplyLeaveBtn"><Link className="nav-link text-light" to="/home/applyLeave"><span className="fas fa-plus-circle"></span> Apply Leave</Link></li>
                        <li className="nav-item" id="homeSettingBtn"><Link className="nav-link text-light" to="/home/setting"><span className="	fas fa-plus-circle"></span> Setting </Link></li>
                        <li className="nav-item" id="homeProfileLeaveBtn"><Link className="nav-link text-light" to="/home/profile"><span className="fas fa-user-alt"></span> Profile</Link></li>
                        <li className="nav-item" ><Link className="nav-link text-light" to="/logout"><span className="fas fa-sign-out-alt"></span> Logout</Link></li>
                    </ul>	
                </div>
            </div>
        </nav>
    );
}

export default Navbar;