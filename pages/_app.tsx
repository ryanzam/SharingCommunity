import "bootswatch/dist/sketchy/bootstrap.min.css";
import "./custom.css"
import NavBar from "../components/Nav";

export default function App({ Component, pageProps } : any)
{
    return <>
    <NavBar />
    <Component {...pageProps} />
    </>
}