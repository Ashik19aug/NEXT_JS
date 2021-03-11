import {useState, useEffect} from 'react';
import fetch from 'isomorphic-unfetch';
import {useRouter} from 'next/router';
import Loder from "../../component/Loder";
import { sign } from 'jsonwebtoken';
import { useCookies } from "react-cookie"

export default function login() {
    const [form, setForm] = useState({email: '', password: ''});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const [auth, setAuth] = useState(false);
    const router = useRouter();
    const [cookie, setCookie] = useCookies(["user"])

    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                userLogin();
            } else {
                setIsSubmitting(false);
            }
        }
    }, [errors])
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        userLogin();
    }
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const userLogin = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/users/login', {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            });
            const {data,authToken} = await res.json();
            // store data into cookies
            setCookie("userName",data[0].name,{
                path:"/"
            });
            setCookie("tokenData",authToken,{
                path:"/"
            });
            setCookie("tokenData",authToken,{
                path:"/"
            });

            if (data.length == 1) {
                setAuth(true);
                await router.push("/profile/profile/");
            } else {
                alert("failed to Login");
                setAuth(false);
                await router.reload("/auth/login/");
            }
        } catch (error) {
            setAuth(false);
            console.log(error);
        }
    }

    return (
        <div className="container" >
            <div className="col-md-6 position-relative start-50 translate-middle-x  p-3">
                <br/>
                <h4 className="text-center"> login </h4>
                <br/>
                {
                    isSubmitting
                        ? <Loder/>
                        : <form onSubmit={handleSubmit}>
                            <div className="mb-6">
                                <label className="form-label">Email : </label>
                                <input type="email" name="email" className="form-control" onChange={handleChange}
                                       placeholder="User Name"/>
                            </div>
                            <br/>
                            <div className="col-md-12 ">
                                <label className="form-label">Password : </label>
                                <input type="password" name="password" className="form-control" onChange={handleChange}
                                       placeholder="Password"/>
                            </div>
                            <br/>
                            <button type="submit" className="btn btn-primary position-absolute start-50">Login</button>
                        </form>}
            </div>
        </div>
    )
}