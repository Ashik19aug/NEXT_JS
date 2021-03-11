import Head from 'next/head'
import styles from '../styles/Home.module.css'
import fetch from "isomorphic-unfetch";

const Home = () => {
    return (
        <>
            <Head>
                <title>App title</title>
            </Head>
            <div className={styles.container}>
                <h4>Index Page</h4>
            </div>
        </>

    )
}

// Home.getInitialProps = async (query) => {
//     let i;
//     for(i=1;i<50000;i++){
//         let form = {
//             "name": 'userTestDataG'+i,
//             "email": 'userTestDataG@a.com'+i,
//             "email_verified_at": 'userTestDataG'+i,
//             "password": 'userTestDataG'+i,
//             "remember_token": 'userTestDataG'+i,
//             "created_at": 'userTestDataG'+i,
//             "updated_at": 'userTestDataG'+i
//         };
//         try {
//             const res = await fetch('http://localhost:3000/api/Test', {
//                 method: 'POST',
//                 body: JSON.stringify(form)
//             });
//             // return res;
//         } catch (error) {
//             console.log(error);
//         }
//     }
//
// }

export default Home;