import '../styles/globals.css'
import '../styles/stylespagination.scss'
import 'bootstrap/dist/css/bootstrap.css'
import '../styles/user.css'
import Navbar from "../component/navbar";
import {CookiesProvider} from "react-cookie"

function MyApp({Component, pageProps}) {
    return (
        <CookiesProvider>
            <div>
                <Navbar/>
                <Component {...pageProps} />
            </div>
        </CookiesProvider>
    )
    // return <Component {...pageProps} />
}

export default MyApp
