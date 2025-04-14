import { TextField } from "@mui/material";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export function AdminLogin() {
    const [cookies, setCookie, removeCookie] = useCookies(['admin_id']);
    let navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            admin_id: '',
            password: ''
        },
        onSubmit: (admin) => {
            axios.get(`http://127.0.0.1:4040/admin`)
                .then(response => {
                    var record = response.data.find((item: any) => item.admin_id === admin.admin_id);
                    if (record) {
                        if (record.password === admin.password) {
                            setCookie("admin_id", admin.admin_id);
                            navigate('/admin-dash');
                        }
                        else {
                            alert("Invalid Password");
                        }
                    }
                    else {
                        alert("Invalid Admin Id");
                    }
                })
        }
    })
    return (
        <div className="d-flex justify-content-center align-items-center text-dark" style={{ height: "400px" }}>
            <div id="admin-login" className="d-flex justify-content-center p-3">
                <div>
                    <h3 className="mb-3">Admin Login</h3>
                    <form onSubmit={formik.handleSubmit}>
                        <dl>
                            <dt>Admin Id:</dt>
                            <dd><TextField onChange={formik.handleChange} label="admin id" type="text" name="admin_id" placeholder="Enter admin id" /></dd>
                            <dt>Password:</dt>
                            <dd><TextField onChange={formik.handleChange} type="password" placeholder="Enter Password" label="password" name="password" /></dd>
                        </dl>
                        <button className="btn btn-warning w-100" type="submit">Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}