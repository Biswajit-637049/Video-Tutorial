import { Button, Card, CardActions, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { VideoContract } from "../contracts/video-contract";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToSaveList } from "../slicers/video-slicer";
import store from "../store/store";

export function UserDash() {
    const [cookies, setCookie, removeCookie] = useCookies(['user_id']);
    const [videos, setVideos] = useState<VideoContract[]>();
    const [inputCategory, setInputCategory] = useState("");

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    let navigate = useNavigate();
    const dispatch = useDispatch();

    function signoutClick() {
        removeCookie("user_id");
        navigate("/user-login");
    }
    function categoryTitleChange(e: any) {
        setInputCategory(e.target.value);
    }
    function searchClick() {
        if (!inputCategory) {
            alert("not found plz search by video titile name");
        } else {
            const result = videos?.filter(video =>
                video.title.toLowerCase().includes(inputCategory.toLowerCase())
            );
            setVideos(result || []);
        }
    }
    // like
    function likeClick(video_id: number) {
        axios.put(`http://127.0.0.1:4040/like-video/${video_id}`).then(() => {
            const updatedLike = videos?.map(video =>
                video.video_id === video_id
                    ? { ...video, likes: video.likes + 1 }
                    : video
            );
            setVideos(updatedLike);
        });
    }
    // dislike
    function disLikeClick(video_id: number) {
        axios.put(`http://127.0.0.1:4040/dislike-video/${video_id}`).then(() => {
            const updatedDisLike = videos?.map(video =>
                video.video_id === video_id
                    ? { ...video, dislikes: video.dislikes + 1 }
                    : video
            );
            setVideos(updatedDisLike);
        });
    }
    function AddToWatchLaterClick(video: VideoContract) {
        dispatch(addToSaveList(video));  // dispatch add into data in addToSaveList
        alert("Added to your watch list");
    }
    useEffect(() => {
        axios.get(`http://127.0.0.1:4040/videos`)
            .then(response => {
                setVideos(response.data);
            })
    }, [inputCategory]);
    return (
        <div>
            <h3 className="d-flex mt-4 justify-content-between"><span>{cookies['user_id']}</span> <span>User Dash</span> <button className="btn btn-danger" onClick={signoutClick}>Signout</button> </h3>
            <div className="row">
                <div className="col-3">
                    <React.Fragment>
                        <Button onClick={handleClickOpen} variant="contained" color="primary" className="bi bi-plus text-white">My Watch List</Button>
                        <Dialog open={open}
                            onClose={handleClose}>
                            <DialogTitle className="fw-bold">Total Videos in Watch History={store.getState().videosCount}</DialogTitle>
                            <DialogContent>
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>Description</th>
                                            <th>Url</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {store.getState().videos.map(viddeo =>
                                            <tr>
                                                <td>{viddeo.title}</td>
                                                <td>{viddeo.description}</td>
                                                <td><iframe src={viddeo.url} frameborder="0"></iframe></td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} variant="contained" color="warning">Cancel</Button>
                               
                            </DialogActions>
                        </Dialog>
                    </React.Fragment>
                </div>
                <div className="col-9 w-25">
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Search videos by video title" name="category_id" onChange={categoryTitleChange} /> <button className="bi bi-search btn btn-warning" onClick={searchClick}></button>
                    </div>
                </div>
            </div>
            <div>
                <div className="d-flex flex-wrap m-4 p-3 overflow-auto" style={{ height: "500px" }}>
                    {
                        videos?.map(video =>
                            <Card key={video.video_id} sx={{ maxWidth: 345 }} className="m-2">
                                <CardMedia sx={{ height: 190 }} >
                                    <iframe width="100%" height="100%" src={video.url}></iframe>
                                </CardMedia>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {video.title}
                                    </Typography>
                                    <Typography sx={{ color: 'text.secondary' }}>
                                        {video.description}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button className="btn bi bi-hand-thumbs-up" onClick={() => likeClick(video.video_id)}><span className="mt-1">{video.likes}</span></Button>
                                    <Button className="btn bi bi-hand-thumbs-down" onClick={() => disLikeClick(video.video_id)}>{video.dislikes}</Button>
                                    <Button className="btn bi bi-eye-fill">{video.views}</Button>
                                    <Button className="btn bi bi-plus" onClick={() => { AddToWatchLaterClick(video) }} style={{ fontSize: "12px" }}>Watch Later</Button>
                                </CardActions>
                            </Card>
                        )
                    }
                </div>
            </div>
        </div>
    )
}