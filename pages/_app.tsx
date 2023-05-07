import 'bootstrap/dist/css/bootstrap.min.css';
import "./custom.css"
import NavBar from "../components/Nav";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CookiesProvider } from 'react-cookie';

export default function App({ Component, pageProps: { session, ...pageProps} } : any)
{
    return <>
            <CookiesProvider>
                <NavBar {...pageProps}/>
                <Component {...pageProps} />
            </CookiesProvider>
            <ToastContainer position="bottom-left"
                        autoClose={5000}
                        hideProgressBar
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="dark" />
    </>
}