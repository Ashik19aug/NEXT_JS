import Head from "next/head";
import styles from "../../styles/Home.module.css";

export default function User() {
    return (
        <>
            <Head>
                <title>App title</title>
            </Head>
            <div className={styles.container}>
                <h4>Users Page</h4>
            </div>
        </>
    )
}

