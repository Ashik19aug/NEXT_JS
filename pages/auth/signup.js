import {useState, useEffect} from 'react';
import fetch from 'isomorphic-unfetch';
import {useRouter} from 'next/router';
import Loder from "../../component/Loder";

export default function signup() {
    const [form, setForm] = useState({name: '', email: '', password: ''});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const router = useRouter();

    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                //good to go....
                createUser();
            } else {
                setIsSubmitting(false);
            }
        }
    }, [errors])

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        createUser();
    }
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const createUser = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/users', {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            });
            await router.push("/auth/login/");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container">
            <br/>
            <h2 className="text-center"> SignUp </h2>
            {
                isSubmitting
                    ? <Loder/>
                    : <form onSubmit={handleSubmit}>
                        <div className="col-md-6 position-relative start-50 translate-middle-x">
                            <label className="form-label">Name : </label>
                            <input type="text" name="name" className="form-control" onChange={handleChange} required/>
                        </div>
                        <div className="col-md-6 position-relative start-50 translate-middle-x">
                            <label className="form-label">Email : </label>
                            <input type="email" name="email" className="form-control" onChange={handleChange} required/>
                        </div>
                        <div className="col-md-6 position-relative start-50 translate-middle-x">
                            <label className="form-label">Password : </label>
                            <input type="password" name="password" className="form-control" onChange={handleChange}
                                   required/>
                        </div>
                        <br/>
                        <button type="submit" className="btn btn-primary position-absolute start-50">Submit</button>
                    </form>
            }
        </div>
    )
}