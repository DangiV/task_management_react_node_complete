import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const NavBar = () => {
    const Navigate = useNavigate();
    const logoutUser = () => {
        localStorage.clear("userToken");
        toast.success("user logout successfully");
        Navigate('/')
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/task">
                    Navbar
                </Link>

                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/task">
                                Task
                            </Link>
                        </li>
                    </ul>
                </div>
                <button className="btn btn-outline-success my-2 my-sm-0 ml-auto" type="submit" onClick={() => logoutUser()}>
                    Logout
                </button>
            </nav>
        </>
    )
}

export default NavBar
