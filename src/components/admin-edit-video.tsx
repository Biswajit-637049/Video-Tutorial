import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { VideoContract } from "../contracts/video-contract";
import { CategoriesContract } from "../contracts/categories-contract";


export function AdminEditVideo() {
    const [video, setVideo] = useState<VideoContract>();
    const [categories, setCategories] = useState<CategoriesContract[]>();
    let params = useParams();
    let navigate = useNavigate();


    function LoadCategories() {
        axios.get(`http://127.0.0.1:4040/categories`)
            .then(response => {
                setCategories(response.data);
            })
    }
    useEffect(() => {
        LoadCategories();
        axios.get(`http://127.0.0.1:4040/videos/${params.id}`)
            .then(response => {
                setVideo(response.data);
            })
    }, [])
    const formik = useFormik({
        initialValues: {
            video_id: video?.video_id,
            title: video?.title,
            description: video?.description,
            url: video?.url,
            likes: video?.likes,
            dislikes: video?.dislikes,
            views: video?.views,
            category_id: video?.category_id
        },
        onSubmit: (video) => {
            axios.put(`http://127.0.0.1:4040/edit-video/${params.id}`, video);
            navigate('/admin-dash');
        },
        enableReinitialize: true
    })
    return (
        <div className="d-flex justify-content-center">
            <div id="admin-edit-video">
                <h3 className="text-center">Edit Video</h3>
                <form onSubmit={formik.handleSubmit}>
                    <dl className="row m-3">
                        <dt className="col-4">Video Id:</dt>
                        <dd className="col-8"><TextField type="number" value={formik.values.video_id} onChange={formik.handleChange} variant="standard" name="video_id" /></dd>
                        <dt className="col-4">Title :</dt>
                        <dd className="col-8"><TextField type="text" value={formik.values.title} onChange={formik.handleChange} variant="standard" name="title" /></dd>
                        <dt className="col-4">Description:</dt>
                        <dd className="col-8"><TextField type="text" value={formik.values.description} onChange={formik.handleChange} variant="standard" name="description" /></dd>
                        <dt className="col-4">Url :</dt>
                        <dd className="col-8"><TextField type="text" value={formik.values.url} onChange={formik.handleChange} variant="standard" name="url" /></dd>
                        <dt className="col-4">Likes :</dt>
                        <dd className="col-8"><TextField type="number" value={formik.values.likes} onChange={formik.handleChange} variant="standard" name="likes" /></dd>
                        <dt className="col-4">Dislikes :</dt>
                        <dd className="col-8"><TextField type="number" value={formik.values.dislikes} onChange={formik.handleChange} variant="standard" name="dislikes" /></dd>
                        <dt className="col-4">Views :</dt>
                        <dd className="col-8"><TextField type="number" value={formik.values.views} onChange={formik.handleChange} variant="standard" name="views" /></dd>
                        <dt className="col-4 mt-4">Category :</dt>
                        <dd className="col-8 mt-2">
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                <Select labelId="demo-simple-select-label" id="demo-simple-select" value={formik.values.category_id || ''} onChange={formik.handleChange}>
                                    {
                                        categories?.map(category =>
                                            <MenuItem key={category.category_id} value={category.category_id}>{category.category_name}</MenuItem>
                                        )
                                    }
                                </Select>
                            </FormControl>
                        </dd>
                    </dl>
                    <div className="text-center">
                        <button type="submit" className="btn btn-success">Save Video</button>
                        <Link to='/admin-dash' className="btn mx-2 btn-warning">Cancel</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}