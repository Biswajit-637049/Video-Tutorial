import { Alert, AlertTitle } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export function AdminDeleteVideo() {
    const [videoDetails, setVideoDetails] = useState({ video_id: 0, title: "", description: "", url: "", likes: 0, dislikes: 0, views: 0, category_id: 0 });
    let param = useParams();
    let navigate = useNavigate();
    useEffect(() => {
        axios.get(`http://127.0.0.1:4040/videos/${param.id}`)
            .then(response => {
                setVideoDetails(response.data);
            })
    }, [param.id])
    function handleDeleteClick() {
        axios.delete(`http://127.0.0.1:4040/delete-video/${param.id}`)
            .then(() => {
                alert("Deleted Successfully");
            });
        navigate("/admin-dash");
    }
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "400px" }}>
            <div>
                <h3 className="text-center">Delete Video</h3>
                <Alert severity="info">
                    <AlertTitle>Title={videoDetails.title}</AlertTitle>
                    <p>Description={videoDetails.description}</p>
                    <button onClick={handleDeleteClick} className="btn btn-danger mx-2">Yes</button>
                    <Link to="/admin-dash" className="btn btn-warning">Cancel</Link>
                </Alert>
            </div>
        </div>
    )
}