import fetch from 'isomorphic-unfetch';
import React, {useState, useEffect, useRef} from "react"
import ReactPaginate from "react-paginate"
import {useRouter} from "next/router"
import {parseCookies} from "../config/cookieHelper"
import {event} from "next/dist/build/output/log";
import jwt from 'jsonwebtoken';


const Home = ({projects}) => {
    const router = useRouter();
    const projectListRef = useRef(null);
    const [searchtext, setSearchtext] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handlePagination = page => {
        const path = router.pathname
        const query = router.query
        query.page = page.selected + 1
        router.push({
            pathname: path,
            query: query,
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        getSearchProject();
    }
    const handleChange = (e) => {
        setSearchtext({
            [searchtext]: e.target.value
        });
    }
    const getSearchProject = search => {
        const path = router.pathname
        const query = router.query
        const srcdata = Object.values(searchtext);
        query.search = srcdata[0];
        router.push({
            pathname: path,
            query: query,
        })
    }

    return (
        <div className="container">
            <h2></h2><br/>
            <div className="d-grid gap-2 d-md-flex">
                <div className=" justify-content-md-start">
                    <form className="d-flex px-2" onSubmit={handleSubmit}>
                        <input className="form-control me-2"
                               name="search"
                               type="text"
                               onChange={handleChange}
                               placeholder="Search"
                               aria-label="Search"/>
                        <button className="btn btn-success " type="submit">Search</button>
                    </form>
                </div>
                <div className="d-grid gap-2 justify-content-md-end ms-auto">
                    <a className="btn btn-success" href="/project/create/">Create New Project</a>
                </div>
            </div>
            <hr/>
            <br/>

            {projects.map(project => {
                return (
                    <div key={project._id} className="shadow p-3 mb-5 bg-body rounded">
                        <div>
                            <div className="row g-0">
                                <div className="col-md-12">
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            {project.name}
                                            <a href={`project/${project._id}`}
                                               className="btn btn-primary float-end btn-sm">View</a>
                                        </h5>
                                        <p className="card-text"><small
                                            className="text-muted">{project.technology}</small></p>
                                        <p className="card-text">{project.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
            <ReactPaginate
                marginPagesDisplayed={2}
                pageRangeDisplayed={2}
                previousLabel={"<<"}
                nextLabel={">>"}
                breakLabel={"..."}
                initialPage={projects.currentPage - 1}
                pageCount={projects.maxPage}
                onPageChange={handlePagination}
                containerClassName={"paginate-wrap"}
                subContainerClassName={"paginate-inner"}
                pageClassName={"paginate-li"}
                pageLinkClassName={"paginate-a"}
                activeClassName={"paginate-active"}
                nextLinkClassName={"paginate-next-a"}
                previousLinkClassName={"paginate-prev-a"}
                breakLinkClassName={"paginate-break-a"}
            />
            <br/>
        </div>
    )
}

Home.getInitialProps = async ({query,req,res}) => {
    const page = query.page || 1;
    const searchValue = query.search;
    let responsData = [];

    //cookie start
    const cookieData = parseCookies(req);
    if(res){
        console.log('xxxxxxxxxxxxxxxxxxxxxxxxx');
    }
    //cookie end

    if (searchValue) {
        try {
            responsData = await fetch(`http://localhost:3000/api/projects?search=${searchValue}`);
        } catch (e) {
            console.log(e);
        }
    } else {
        responsData = await fetch(`http://localhost:3000/api/projects?page=${page}`);
    }
    const {data} = await responsData.json();
    return {projects: data};
}

export default Home;