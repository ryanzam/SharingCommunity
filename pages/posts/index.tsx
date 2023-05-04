import React, { useState, useEffect } from 'react';
import { FcBrokenLink } from 'react-icons/fc'
import { getCookie } from 'cookies-next';
import { IPost } from '../../models/IIModels';
import { Spinner } from 'reactstrap';
import PaginateComponent from '../../components/Pagination';


export default function Posts({email}: any) {
    const [posts, setPosts] = useState<IPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [clickedItemId, setClickedItemId] = useState<string>();

    const [imgPreviewItem, setImgPreviewItem] = useState<any>(null);
    const [hovering, setHovering] = useState(false);
    const [imgPreview, setImgPreview] = useState(null);
    const [imgHeightY, setImgHeightY] = useState(0);
    const [imgPreviewLoaded, setImgPreviewLoaded] = useState(false);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPosts, setTotalPost] = useState<number>(0);

    const handlePreviewFetch = async (link: string) => {
        let res = await fetch("http://localhost:3000/api/preview?link="+link);
        const data = await res.json();
        setImgPreview(data.image);
        setImgPreviewLoaded(true);
    } 
    

    const fetchPosts = async (currentPage: any) => {
        const response = await fetch('api/post?'+ new URLSearchParams({
            pagination : '5', 
            page: currentPage
        }));
        const data = await response.json();
        setPosts(data.posts);
        setTotalPost(data.totalPosts);
        setLoading(false);
    }

    useEffect(() => {
        fetchPosts(currentPage);
    }, [clickedItemId, currentPage]);

    if (loading) {
        return <div className='container'>
            <Spinner />
        </div>
    }

    const handleClick= (id: string) => {
        const reqOpts = {
            method: 'PUT'
        }
        fetch('api/post?id=' + id, reqOpts)
            .then(res => res.json());
        setClickedItemId(id);
    }

    const handleMouseEnter = (e: any, item: any) => {
        setImgHeightY(e.clientY - 90);
        setHovering(true);  
        setImgPreviewItem(item);
    }

    const handleMouseLeave = () => {
        setHovering(false);
        setImgPreviewItem(null);
        setImgPreview(null);
        setImgPreviewLoaded(false);
    }

    const PreviewLink = () => {
        if(!imgPreviewLoaded) {
            handlePreviewFetch(imgPreviewItem!.link);
        }
        if(!imgPreview) 
            return <div style={{position:'absolute', height: '150px', width: '250px', backgroundColor: 'white'}}>
                <Spinner className='img-preview' style={{position:'absolute', top: imgHeightY +'px'}}/>
            </div>
                
        return <img className='img-preview' style={{position:'absolute', height: '150px', width: '250px', top: imgHeightY +'px'}} src={`data:image/jpeg;base64, ${imgPreview}`} />
    }

    const nextPage = (pageNumber: any) => {
        setCurrentPage(pageNumber);
        setPosts([]);
        fetchPosts(currentPage)
    }

    let numberofpage = 0;
    if (totalPosts % 5 == 0)
        numberofpage = Math.floor(totalPosts / 5);
    else
        numberofpage = Math.floor(totalPosts / 5) + 1;

    return (
        <div className="posts">
           <div className="container p-2 position-relative">
           {hovering && <PreviewLink />}

            {posts.map(p =>
                <div className='row mb-1' key={p._id}>
                    <div className='col' onMouseEnter={(e) => handleMouseEnter(e, p)} onMouseLeave={handleMouseLeave} >
                            <div className="card" >
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
                    <div className="col-2 badge badge-pill position-relative border border-primary">
                        <h4 className='position-absolute top-50 start-50 translate-middle'>{p.postedBy.Username}</h4>
                        <div className="position-relative py-2 px-4 text-bg-dark border border-dark rounded-pill">
                            ClanCoins: {p.postedBy.ClanCoins} <svg width="1em" height="1em" viewBox="0 0 16 16" className="position-absolute top-100 start-50 translate-middle mt-1" fill="var(--bs-dark)" xmlns="http://www.w3.org/2000/svg"><path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/></svg>
                        </div>
                    </div>
                </div>)}

                {totalPosts > 5 && 
                    <PaginateComponent 
                        pages={numberofpage}
                        nextPage={nextPage}
                        currentPage={currentPage}
                    />}
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