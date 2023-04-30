import React, { useState, useEffect } from 'react';
import { FcBrokenLink, FcLink } from 'react-icons/fc'

import { getCookie } from 'cookies-next';

interface Post{
    _id: string;
    Title: string;
    Link: string;
    Clicked: number;
    Published: Date;
}

export default function Posts({email}: any) {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [clickedItemId, setClickedItemId] = useState<string>();

    useEffect(() => {
        async function fetchPosts() {
            const response = await fetch('api/post');
            const data = await response.json();
            setPosts(data);
            setLoading(false);
        }
        fetchPosts();
    }, [clickedItemId]);

    if (loading) {
        return <div>
            Loading...
        </div>
    }

    function handleClick(id: string) {
        const reqOpts = {
            method: 'PUT'
        }
        fetch('api/post?id=' + id, reqOpts)
            .then(res => res.json());
        setClickedItemId(id);
    }

    return (
        <div className="posts">
           <div className="container p-2">
            <div className='row'>
                <div className='col'>
                    {posts.map(p =>
                        <div className="card mb-1" key={p._id}>
                            <div className="card-header d-flex justify-content-between">
                                <h5><i className="fa-solid fa-link"></i> { p.Title }</h5>
                                <p>Total clicks: {p.Clicked}</p>
                            </div>
                            <div className="card-body">
                                <p className="card-text d-flex justify-content-between">
                                    <a href={p.Link} onClick={() => handleClick(p._id)} target="_blank"> {p.Link}</a>
                                    <p>Posted on: <span className="text-muted">{new Date(p.Published).toLocaleString()}</span></p>
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
           </div>
        </div>
    )
}


export async function getServerSideProps(context: any) {
    const req = context.req
    const res = context.res
    var email = getCookie('email', { req, res });
    if (email == undefined){
        email = false;
    }
    return { props: {email} };
};