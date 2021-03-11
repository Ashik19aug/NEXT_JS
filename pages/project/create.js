import {useState, useEffect} from 'react';
import fetch from 'isomorphic-unfetch';
import Loder from "../../component/Loder";
import {useRouter} from 'next/router';

export default function ProjectCreate() {

    const [form, setForm] = useState({name: '', language: '', technology: '', description: ''});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const router = useRouter();

    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                //good to go....
                createProject();
            } else {
                setIsSubmitting(false);
            }
        }
    }, [errors])

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        createProject();
    }
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const createProject = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/projects', {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)

            });
            // console.log(body);
            await router.push("/home/");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container">
            <br/>
            <div className="shadow-lg p-3 mb-5 bg-body rounded">
                <h4 className="text-center">Create New Project</h4>
                {
                    isSubmitting
                        ? <Loder/>
                        : <form className="row g-3" onSubmit={handleSubmit}>
                            <div className="col-md-6">
                                <label htmlFor="inputEmail4" className="form-label">Project Name</label>
                                <input type="text" name="name" className="form-control" id="name" onChange={handleChange}
                                       required/>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputPassword4" className="form-label">Language</label>
                                <input type="text"
                                       name="language"
                                       className="form-control"
                                       id="language"
                                       onChange={handleChange}
                                       required
                                />
                            </div>
                            <div className="col-12">
                                <label htmlFor="inputAddress" className="form-label">Technology</label>
                                <input type="text"
                                       name="technology"
                                       className="form-control"
                                       id="technology"
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
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-12">
                                <button type="submit" className="btn btn-primary">Create</button>
                                <a className="btn btn-danger ms-1" href="/home/">Back</a>
                            </div>
                        </form>
                }
            </div>
        </div>
    )
}