import Link from "next/link";
import {useState, useEffect} from 'react';

export default function Navbar() {


    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    <img src="https://cdn.worldvectorlogo.com/logos/next-js.svg" alt="" width="30" height="24"
                         className="d-inline-block align-top" />
                    <b>NEXTjs</b>
                </a>
                {/*<button className="navbar-toggler" type="button" data-bs-toggle="collapse"*/}
                {/*        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"*/}
                {/*        aria-expanded="false" aria-label="Toggle navigation">*/}
                {/*</button>*/}
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item px-2">
                            <Link className="nav-link" aria-current="page" href="/">
                               <a className="nav-link">Home</a>
                            </Link>
                        </li>
                        <li className="nav-item px-2">
                            <Link className="nav-link" href="/user/">
                                <a className="nav-link">User</a>
                            </Link>
                        </li>
                        <li className="nav-item px-2">
                            <Link className="nav-link" href="/home/">
                                <a className="nav-link">Project</a>
                            </Link>
                        </li>
                        <li className="nav-item px-2">
                            <Link className="nav-link" href="/profile/profile/">
                                <a className="nav-link">Profile</a>
                            </Link>
                        </li>
                    </ul>
                    {/*<form className="d-flex px-2" onSubmit={handleSubmit}>*/}
                    {/*    <input className="form-control me-2" name="search" onChange={handleChange} type="search" placeholder="Search" aria-label="Search"/>*/}
                    {/*    <button className="btn btn-success " type="submit">Search</button>*/}
                    {/*</form>*/}
                    <ul className="navbar-nav">
                        <li className="nav-item px-2">
                            <Link className="nav-link " aria-current="page" href="/auth/login/">
                                <a className="nav-link">Login</a>
                            </Link>
                        </li>
                        <li className="nav-item px-2">
                            <Link className="nav-link " aria-current="page" href="/auth/signup/">
                                <a className="nav-link">SignUp</a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}