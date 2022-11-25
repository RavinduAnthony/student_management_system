import { Outlet, Link } from "react-router-dom";
import { Component } from "react";


class NavBar extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg bg-light">
                    <div className="container-fluid">
                        {/* <a className="navbar-brand" href="#">Student Management System</a> */}
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link style={{textDecoration: 'none'}} to="/">
                                        <a className="nav-link" >Student</a>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link style={{textDecoration: 'none'}} to="/teacher">
                                        <a className="nav-link" >Subject</a>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link style={{textDecoration: 'none'}} to="/teacher">
                                        <a className="nav-link" >Class Room</a>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link style={{textDecoration: 'none'}} to="/teacher">
                                        <a className="nav-link" >Teacher</a>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link style={{textDecoration: 'none'}} to="/allocateSubject">
                                        <a className="nav-link" >Allocate Subject</a>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link style={{textDecoration: 'none'}} to="/allocateClass">
                                        <a className="nav-link" >Allocate Class</a>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link style={{textDecoration: 'none'}} to="/studentDetail">
                                        <a className="nav-link" >Student Details</a>
                                    </Link>
                                </li>
                            </ul>
                            
                        </div>
                    </div>
                </nav>
                <Outlet />
            </div>
        )
    }
}
export default NavBar