import React from 'react';
import { getCookie } from 'cookies-next';
import clientPromise from "../../lib/mongodb";
import { UserType } from '../../models/IIModels';
import Admin from './admin';
import GuestDashboard from './guest';

import { useRouter } from "next/router";

export default function Dashboard({user }: any)
{
    const router = useRouter();

    if (typeof window === "undefined") return null;

    const renderDashboard = () => {
        if(user.UserType == UserType.Admin){
            router.push("/user/admin");
        } else {
            router.push("/user/guest");
        }
    }

    return(
        <>
            {renderDashboard()}
        </>
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
    const user = await db.collection("users").findOne({"Email": email});  
    return {
      props: { 
        user: JSON.parse(JSON.stringify(user))
        , email
    }
}
}