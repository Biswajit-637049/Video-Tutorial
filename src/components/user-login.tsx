import { TextField } from "@mui/material";
import { psAF } from "@mui/material/locale";
import axios from "axios";
import { useFormik } from "formik";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";


export function UserLogin() {
    let navigate=useNavigate();
    const[cookie,setCookie,removeCookie]=useCookies(['user_id']);
    const formik = useFormik({
        initialValues: {
           userid:"",
           password:""
        },
        onSubmit: (user) => {
             axios.get(`http://127.0.0.1:4040/users`)
             .then(response=>{
                var record=response.data.find((item:any)=>item.userid===user.userid);
                if(record){
                    if(record.password===user.password){
                        setCookie('user_id',user.userid);
                        navigate('/user-dash');
                    } 
                    else{
                        alert("Invalid Password");
                    }
                }
                else{
                    alert("Username Not Exit");
                }
             })
        }
    })
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "500px" }}>
            <div style={{ width: "400px" }} id="login-form" className="bg-secondary text-white p-2">
                <h3 className="text-center">User Login</h3>
                <form className="d-flex justify-content-center mt-3" onSubmit={formik.handleSubmit}>
                    <div>
                        <dl>
                            <dt>User Id :</dt>
                            <dd><TextField type="text" onChange={formik.handleChange} variant="standard" label="user id" placeholder="Enter user id" name="userid" /></dd>
                            <dt>Password :</dt>
                            <dd><TextField type="password" onChange={formik.handleChange} variant="standard" label="user password" placeholder="Enter user password" name="password" /></dd>
                        </dl>
                        <button className="btn btn-warning w-100" type="submit">Login</button>
                    </div>
                </form>
                <div className="my-2 ms-5">
                    <Link to="/register-user" className="text-white ms-5">New User Register ?</Link>
                </div>
            </div>
        </div>
    )
}