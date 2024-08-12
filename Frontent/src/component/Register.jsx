import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MakeRequest } from '../MakeReuest'
import { toast } from 'react-toastify'

const Register = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        fName: "",
        lName: "",
        email: "",
        password: ""
    })

    //function to track value of form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((oldVal) => ({
            ...oldVal,
            [name]: value
        }))
    }

    // function for submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("form data", userData)

        try {
            const response = await MakeRequest('post', '/register', userData);
            console.log("user register data", response);
            toast.success('register successfully');
            navigate('/')
        } catch (error) {
            console.log(error.response.data)
            toast.error(error.response.data)
        }
    }
    return (
        <>
            <section className="vh-100" style={{ backgroundColor: "#eee" }}>
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-12 col-xl-11">
                            <div className="card text-black" style={{ borderRadius: 25 }}>
                                <div className="card-body p-md-5">
                                    <div className="row justify-content-center">
                                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4"> Sign up </p>
                                            <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="text" className="form-control" id='fName' name='fName' value={userData.fName} onChange={handleChange} />
                                                        <label className="form-label" htmlFor="form3Example1c"> first Name </label>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="text" className="form-control" id='lName' name='lName' value={userData.lName} onChange={handleChange} />
                                                        <label className="form-label" htmlFor="form3Example1c"> last Name </label>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="email" className="form-control" id='email' name='email' value={userData.email} onChange={handleChange} />
                                                        <label className="form-label" htmlFor="form3Example1c"> email </label>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="password" className="form-control" id='password' name='password' value={userData.password} onChange={handleChange} />
                                                        <label className="form-label" htmlFor="form3Example1c"> password  </label>
                                                    </div>
                                                </div>

                                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                    <button type="submit" className="btn btn-primary btn-lg">Register</button>
                                                </div>

                                                <p className="text-center text-muted mt-5 mb-0">Have already an account? <Link to="/" className="fw-bold text-body"><u>Login here</u></Link></p>

                                            </form>
                                        </div>
                                        <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" className="img-fluid" alt="Sample image" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Register
