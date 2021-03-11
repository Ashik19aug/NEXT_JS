import fetch from "isomorphic-unfetch";
import {useState, useEffect} from 'react';
import Link from "next/link";
import {useRouter} from 'next/router';
import Router from 'next/router'
import Loder from "../../../component/Loder";

const EditProject = ({project}) => {

    const [form, setForm] = useState({
        name: project.name,
        language: project.language,
        technology: project.technology,
        description: project.description
    });
    const router = useRouter();
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                //good to go....
                UpdateProject();
            } else {
                setIsSubmitting(false);
            }
        }
    }, [errors])

    const UpdateProject = async () => {
        try {
            const ProjectID = router.query.id;
            const res = await fetch('http://localhost:3000/api/projects/' + ProjectID, {
                method: 'PUT',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            });
            await router.push("/home/");
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        UpdateProject();
    }

    return (
        <div className="container">
            <br/>
            <div className="shadow-lg p-3 mb-5 bg-body rounded">
                <div className="card text-center">
                    <div className="card-header">
                        Edit Project
                        <a onClick={() => Router.back()} className="btn btn-info float-end btn-sm">Go Back</a>
                    </div>
                    <div className="card-body">
                        {
                            isSubmitting
                                ? <Loder/>
                                : <form className="row g-3" onSubmit={handleSubmit}>
                                    <div className="col-md-6">
                                        <label htmlFor="inputEmail4" className="form-label">Project Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            className="form-control"
                                            id="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="inputPassword4" className="form-label">Language</label>
                                        <input
                                            type="text"
                                            name="language"
                                            className="form-control"
                                            id="language"
                                            value={form.language}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-12">
                                        <label htmlFor="inputAddress" className="form-label">Technology</label>
                                        <input
                                            type="text"
                                            name="technology"
                                            className="form-control"
                                            id="technology"
                                            value={form.technology}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-12">
                                        <label htmlFor="inputAddress2" className="form-label">Description</label>
                                        <textarea
                                            type="text"
                                            name="description"
                                            className="form-control"
                                            id="description"
                                            value={form.description}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-12">
                                        <button type="submit" className="btn btn-primary">Update</button>
                                    </div>
                                </form>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

EditProject.getInitialProps = async ({query: {id}}) => {
    const res = await fetch('http://localhost:3000/api/projects/' + id);
    const {data} = await res.json();
    return {project: data};
}

export default EditProject;