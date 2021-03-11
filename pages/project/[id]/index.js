import fetch from "isomorphic-unfetch";
import {useRouter} from "next/router";

const Show = ({project}) => {

    const router = useRouter();
    const deleteProject = async () => {
        const projectID = router.query.id;
        try {
            const deleted = await fetch('http://localhost:3000/api/projects/' + projectID, {method: "Delete"});
            router.push("/home/");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container">
            <br/>

            <div className="card text-center position-absolute top-50 start-50 translate-middle shadow p-3 mb-5 bg-body rounded">
                <div className="card-body">
                    <h5 className="card-title">{project.name}</h5>
                    <p className="card-text"><small className="text-muted">{project.technology}</small></p>
                    <p className="card-text">{project.description}</p>
                    <a href="/home/" className="btn btn-primary ms-1">Back</a>
                    <a href="#" onClick={deleteProject} className="btn btn-danger ms-1">DELETE</a>
                    <a href={`${project._id}/edit`} className="btn btn-info ms-1">Edit</a>
                </div>
            </div>

        </div>
    )
}

Show.getInitialProps = async ({query: {id}}) => {
    const res = await fetch('http://localhost:3000/api/projects/' + id);
    const {data} = await res.json();
    return {project: data};
}

export default Show;