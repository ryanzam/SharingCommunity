import React, { useState, useEffect } from 'react';
import { FcBrokenLink } from 'react-icons/fc'

import { getCookie } from 'cookies-next';

import { IPost } from '../../models/IIModels';

const badgeType = ["bg-primary", "bg-secondary", "bg-warning", "bg-light", "bg-success"];

export default function Posts({email}: any) {
    const [posts, setPosts] = useState<IPost[]>([]);
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

    const renderClass = () => {
        const rndm = Math.floor(Math.random()*badgeType.length);
        return "col-2 badge badge-pill position-relative " + badgeType[rndm];
    }

    return (
        <div className="posts">
           <div className="container p-2">
           {posts.map(p =>
                <div className='row mb-1'>
                    <div className={renderClass()}>
                        <h2 className='position-absolute top-50 start-50 translate-middle'>{p.postedBy.Username}</h2>
                        <div className="position-relative py-2 px-4 text-bg-dark border border-dark rounded-pill">
                            ClanCoins: {p.postedBy.ClanCoins} <svg width="1em" height="1em" viewBox="0 0 16 16" className="position-absolute top-100 start-50 translate-middle mt-1" fill="var(--bs-dark)" xmlns="http://www.w3.org/2000/svg"><path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/></svg>
                        </div>
                    </div>
                    <div className='col'>
                            <div className="card" key={p._id}>
                                <div className="card-header d-flex justify-content-between">
                                    <h5><i className="fa-solid fa-link"></i> { p.title }</h5>
                                    <p>Total clicks: {p.clicked}</p>
                                </div>
                                <div className="card-body">
                                    <p className="card-text d-flex justify-content-between">
                                        <a href={p.link} onClick={() => handleClick(p._id)} target="_blank"><FcBrokenLink /> {p.link}</a>
                                        <p>Posted on: <span className="text-muted">{new Date(p.published).toLocaleString()}</span></p>
                                    </p>
                                </div>
                            </div>
                    </div>
                </div>)}
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