import { useEffect, useState } from "react";
import { CategoriesContract } from "../contracts/categories-contract";
import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";


export function AdminAddVideo() {
    const [categories, setCategories] = useState<CategoriesContract[]>();
    let navigate = useNavigate();
    useEffect(() => {
        axios.get(`http://127.0.0.1:4040/categories`)
            .then(response => {
                response.data.unshift({ category_id: -1, category_name: "select category" })
                setCategories(response.data);
            })
    }, []);
    const formik = useFormik({
        initialValues: {
            video_id: 0,
            title: '',
            description: '',
            url: '',
            likes: 0,
            dislikes: 0,
            views: 0,
            category_id: 0
        },
        validationSchema: yup.object({
            video_id: yup.number().positive("must be positive"),
            title: yup.string().required("Title must type"),
            description: yup.string().required("Description must type"),
            url: yup.string().required("Url must type").url("Invalid Url"),
            likes: yup.number().min(0, 'Cannot be negative'),
            dislikes: yup.number().min(0, 'Cannot be negative'),
            views: yup.number().min(0, 'Cannot be negative'),
            category_id: yup.string().required('Category is required')
        }),
        onSubmit: (video) => {
            axios.post(`http://127.0.0.1:4040/add-video`, video);
            alert('video addedd');
            navigate("/admin-dash");
        }
    })
    return (
        <div className="d-flex justify-content-center align-items-center">
            <div style={{ width: "400px", borderRadius: "30px" }} className=" border border-1 p-4 mt-1">
                <h2 className="text-center">Add Video</h2>
                <form onSubmit={formik.handleSubmit}>
                    <dl className="row">
                        <dt className="col-4">Video Id :</dt>
                        <dd className="col-8"><input type="number" onChange={formik.handleChange} name="video_id" /></dd>
                        <dd className="text-danger text-center ms-1">({formik.errors.video_id})</dd>
                        <dt className="col-4">Title:</dt>
                        <dd className="col-8"><input type="text" onChange={formik.handleChange} name="title" /></dd>
                        <dd className="text-danger text-center">{formik.errors.title}</dd>
                        <dt className="col-4">Description :</dt>
                        <dd className="col-8"><input type="text" onChange={formik.handleChange} name="description" /></dd>
                        <dd className="text-danger text-center ms-4">{formik.errors.description}</dd>
                        <dt className="col-3">Url :</dt>
                        <dd className="col-8 ms-4"><input type="text" onChange={formik.handleChange} name="url" /></dd>
                        <dd className="text-danger text-center">{formik.errors.url}</dd>
                        <dt className="col-4">Likes :</dt>
                        <dd className="col-8"><input type="number" onChange={formik.handleChange} name="likes" /></dd>
                        <dd className="text-danger text-center ms-3">{formik.errors.likes}</dd>
                        <dt className="col-4">Dislikes :</dt>
                        <dd className="col-8"><input type="number" onChange={formik.handleChange} name="dislikes" /></dd>
                        <dd className="text-danger text-center ms-3">{formik.errors.dislikes}</dd>
                        <dt className="col-4">Views :</dt>
                        <dd className="col-8"><input type="number" onChange={formik.handleChange} name="views" /></dd>
                        <dd className="text-danger text-center ms-3">{formik.errors.views}</dd>
                        <dt className="col-4">Category :</dt>
                        <dd className="col-8">
                            <select name="category_id" onChange={formik.handleChange}>
                                {
                                    categories?.map(category =>
                                        <option key={category.category_id} value={category.category_id}>{category.category_name}</option>
                                    )
                                }
                            </select>
                            <dd className="text-danger text-center">{formik.errors.category_id}</dd>
                        </dd>
                    </dl>
                    <button type="submit" className="btn btn-primary w-100">Add Video</button>
                </form>
                <Link to="/admin-dash" className="btn btn-link text-white mt-4">Back to Dashboard ....</Link>
            </div>
        </div>
    )
}