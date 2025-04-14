import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { VideoContract } from "../contracts/video-contract";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export function AdminDash() {
    const [cookies, setCookie, removeCookie] = useCookies(['admin_id']);
    const [videos, setVideos] = useState<VideoContract[]>();
    let navigate=useNavigate();
    useEffect(() => {
        axios.get("http://127.0.0.1:4040/videos")
            .then(response => {
                setVideos(response.data);
            })
    }, []);
    function SignoutClick(){
        removeCookie("admin_id");
        navigate("/");
    }
    return (
        <div className="container-fluid mt-5">
            <h3 className="d-flex justify-content-between mb-3"><span>Admin Dash- <span>{cookies["admin_id"]}</span></span><Link to="/add-video" className="btn btn-primary bi bi-camera-video"> Add New Video</Link><button className="btn btn-danger" onClick={SignoutClick}>Signout</button></h3>
            <div id="tblBody">
                <table className="table table-hover caption-top">
                    <caption className="text-dark bg-light fw-bolder fs-4 text-center position-sticky top-0">Uploaded Videos</caption>
                    <thead id="tblHead">
                        <tr>
                            <th>Title</th>
                            <th>Preview</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            videos?.map(video =>
                                <tr key={video.video_id} >
                                    <td className="fw-bold">{video.title}</td>
                                    <td>
                                        <iframe src={video.url} width="300" height="200"></iframe>
                                    </td>
                                    <td>{video.description}</td>
                                    <td>
                                        <Link to={`/edit-video/${video.video_id}`} className="btn btn-warning bi bi-pen-fill mx-2"></Link>
                                        <Link to={`/delete-video/${video.video_id}`} className="btn btn-danger bi bi-trash-fill"></Link>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}