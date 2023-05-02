import React, { useState, useEffect } from 'react';
import { getCookie } from 'cookies-next';
import clientPromise from "../../lib/mongodb";
import { Alert } from 'reactstrap';
import { FaPlus } from "react-icons/fa";
import { useRouter } from 'next/router'

import { IPost } from '../../models/IIModels';

export default function GuestDashboard({ user, posts }: any)
{
    const [visibleMsg, setVisibleMsg] = useState<boolean>(true);
    const router = useRouter();
    const { msg } = router.query
    let userPosts: Array<IPost>;
    userPosts = posts;

    const onDismiss = () => setVisibleMsg(false);

    const renderUserPosts = () => {
        return <>
         {userPosts.length > 0 ? <p>You have { userPosts.length } posts.</p> : <p>You haven't posted anything yet.</p>}
                {userPosts.map(p =>
                <div className='row'>
                <div className='col'>
                        <div className="card border-primary mb-3">
                            <div className="card-header d-flex justify-content-between">
                                <h5> { p.title }</h5>
                                <div className='d-flex'>
                                    <div className='me-3'>{p.isApproved ? <span className="badge text-bg-success">Approved</span> : <span className="badge text-bg-warning">Pending for Approval</span>}</div>
                                    <p>Total clicks: {p.clicked}</p>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="card-text d-flex justify-content-between">
                                    <a href={p.link}> {p.link}</a>
                                    <p>{new Date(p.published).toDateString()}</p>
                                </div>
                            </div>
                        </div>
                </div>
            </div>)}
        </>
    }

    return(
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <div>
                        <Alert color="info" className='d-flex justify-content-between'>
                            <div>Welcome, { user.Username}! You have: { user.ClanCoins } ClanCoins.</div> 
                            <a href='/posts/create' className='btn btn-primary' ><FaPlus /> Create</a>
                        </Alert>
                    </div>
                {msg ? <Alert color='success' isOpen={visibleMsg} toggle={onDismiss}>{ msg }</Alert> : <></> }
                </div>
            </div>
            {renderUserPosts()}               
        </div>
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
    const posts = await db.collection("items").find({"postedBy.Email": email }).toArray();

    return {
      props: { 
        user: JSON.parse(JSON.stringify(user)), 
        posts: JSON.parse(JSON.stringify(posts)),
        email: email
        }
    }
}