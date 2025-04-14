import { TextField } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";


export function RegisterUser() {
    let navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            userid: "",
            username: "",
            password: "",
            email: ""
        },
        validationSchema: yup.object({
            userid: yup.string().required('user id required'),
            username: yup.string().required('username required'),
            password: yup.string().required("User Password must be type").min(5, 'Password must be at least 5 characters long')
                .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
                .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
                .matches(/[0-9]/, 'Password must contain at least one number')
                .matches(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
            email: yup.string().email("Invalid Email").required("email must be type").matches(/@gmail\.com/, 'Email must end with gmail.com')
        }),
        onSubmit: (user) => {
            axios.post('http://127.0.0.1:4040/register-user', user)
                .then(() => {
                    console.log("registered");
                })
            alert("Registered Successfully");
            navigate('/user-login');
        }
    })
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "500px" }}>
            <div style={{ width: "400px" }} id="login-form" className="bg-secondary text-white p-2">
                <h3 className="text-center">Register User</h3>
                <form onSubmitCapture={formik.handleSubmit} className="d-flex justify-content-center mt-3" onSubmit={formik.handleSubmit}>
                    <div>
                        <dl>
                            <dt>User Id :</dt>
                            <dd><TextField type="text" variant="standard" onChange={formik.handleChange} label="user id" placeholder="Enter user id" name="userid" /></dd>
                            <dd className="text-danger">{formik.errors.userid}</dd>
                            <dt>User Name :</dt>
                            <dd><TextField type="text" variant="standard" onChange={formik.handleChange} label="user name" placeholder="Enter user name" name="username" /></dd>
                            <dd className="text-danger">{formik.errors.username}</dd>
                            <dt>Password :</dt>
                            <dd><TextField type="password" onChange={formik.handleChange} variant="standard" label="user password" placeholder="Enter user password" name="password" /></dd>
                            <dd className="text-danger">{formik.errors.password}</dd>
                            <dt>User Email :</dt>
                            <dd><TextField type="email" onChange={formik.handleChange} variant="standard" label="user email" placeholder="Enter user email" name="email" /></dd>
                            <dd className="text-danger">{formik.errors.email}</dd>
                        </dl>
                        <button className="btn btn-warning w-100" type="submit">Register</button>
                    </div>
                </form>
                <div className="my-2 text-center">
                    <Link to="/user-login" className="text-white">Exsiting User ?</Link>
                </div>
            </div>
        </div>
    )
}