import React, { useState, useEffect } from 'react';
import { getCookie } from 'cookies-next';
import clientPromise from "../../lib/mongodb";
import { Alert, Button, ButtonGroup } from 'reactstrap';
import { useRouter } from 'next/router'
import { IPost } from '../../models/IIModels';
import { toast } from 'react-toastify';

export default function Admin({ user }: any)
{
    const [visibleMsg, setVisibleMsg] = useState<boolean>(true);
    const [posts, setPosts] = useState<IPost[]>([]);

    const router = useRouter();
    const { msg } = router.query

    useEffect(() => {
        async function fetchPost(){
            await fetchData();
        }
        fetchPost();
    }, [posts.length]);

    const fetchData = async() => {
        const res = await fetch("/api/postapprove");
        const data = await res.json();
        setPosts(data);
    }

    const onDismiss = () => setVisibleMsg(false);

    if(user == null)
    {
        return <></>;
    }

    const approve = async (pid: string, uid: string) => {
        const reqOpts = {
            method: 'POST',
            body: JSON.stringify({
                pid: pid,
                uid: uid 
            })
        }
        await fetch('/api/postapprove', reqOpts)
            .then(res => res.json());
        toast.success("The post is approved.")
    }

    const renderPosts = () => {
        return <>
            {posts.length > 0 ? <p>You have { posts.length } posts pending for approval.</p> : <p>Nothing to approve.</p>}
            {posts.map(p =>
                <div className='row' key={p._id}>
                    <div className='col'>
                        <div className="card border-primary mb-3">
                            <div className="card-header d-flex justify-content-between">
                                <h5> { p.title } </h5><span>PostedBy: { p.postedBy.Username }</span>
                                <ButtonGroup>
                                    <Button color="success" onClick={() => approve(p._id, p.postedBy._id)}>
                                        Approve
                                    </Button>
                                    <Button color="danger">
                                        Reject
                                    </Button>
                                </ButtonGroup>
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
                            <div>Hello, { user.Username}! </div> 
                        </Alert>
                    </div>
                {msg ? <Alert color='success' isOpen={visibleMsg} toggle={onDismiss}>{ msg }</Alert> : <></> }
                </div>
            </div>
            {renderPosts()}
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
    const posts = await db.collection("items").find({"isApproved": false }).toArray();
    console.log(posts);
    return {
      props: { 
        user: JSON.parse(JSON.stringify(user)), 
        posts: JSON.parse(JSON.stringify(posts)),
        email: email
      }
    }
    
}