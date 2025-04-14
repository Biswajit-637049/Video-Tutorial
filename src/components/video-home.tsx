import { Link } from "react-router-dom";

export function VideoHome() {
    return (
        <div className="d-flex justify-content-center">
            <div id="homeContainer" className="d-flex flex-column justify-content-center align-items-center mt-5">     
                <Link to="/admin-login" className="btn btn-primary w-50">Admin Login</Link>
                <Link to="/user-login" className="btn btn-warning w-50 mt-5">User Login</Link>
            </div>
        </div>
    )
}