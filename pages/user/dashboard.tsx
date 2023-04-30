import { getCookie } from 'cookies-next';
import clientPromise from "../../lib/mongodb";

export default function Dashboard({email, username}: any)
{
    return(
        <h1>Hello, {username}</h1>
    )
}

export async function getServerSideProps(context: any) {
    const req = context.req
    const res = context.res
    var email = getCookie('email', { req, res });
    if (email == undefined){
        return {
            redirect: {
                permanent: false,
                destination: "/"
            }
        }
    }
    const client = await clientPromise;
    const db = client.db("sharingClan");
    const users = await db.collection("users").find({"Email": email}).toArray();
    const user = users[0]
    const username = user.Username;
    console.log(user)
    return {
      props: {username: username, email: email},
    }
}