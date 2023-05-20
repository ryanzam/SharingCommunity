import React, { useState } from 'react'
import { getCookie } from 'cookies-next';

export default function CreatePost( {email}: any) {
    const [link, setLink] = useState<string>("https://example.com");
    const [isLinkValid, setIsLinkValid] = useState<boolean>(true);

    const linkChangeHandler = (e: any) => {
        let val = e.target.value;
        setLink(val)
        let isLinkValid = validateLink(val);
        setIsLinkValid(isLinkValid);
    }


    const validateLink = (linkString: string) => {
        try {
            const newLink = new URL(linkString);
            return newLink.protocol == 'https:';
        } catch (e) {
            return false;
        }
    }

    return (
        <div className='container'>
            <div className="row mt-5">
                <div className="col">
                    <form action='/api/post' method='POST'>
                        <fieldset>
                            <h2>Post a link to share with clan.</h2>
                            <div className="form-group">
                                <label htmlFor="title" className="form-label mt-4">Title</label>
                                <input type="text" className="form-control" id="title" placeholder="Enter title." name='title'  required/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor="category" className="form-label mt-4">Category</label>
                                <select id="category" required className="form-select" name='category'>
                                    <option value="">Select a category</option>
                                    <option value="facebook">Facebook</option>
                                    <option value="instagram">Instagram</option>
                                    <option value="twitter">Twitter</option>
                                    <option value="tiktok">Tiktok</option>
                                    <option value="twitch">Twitch</option>
                                    <option value="youtube">Youtube</option>
                                    <option value="other">Other websites</option>
                                </select>
                            </div>
                            <div className="form-group ">
                                <label htmlFor="link" className="form-label mt-4">Link</label>
                                <input onChange={linkChangeHandler} type="text" className={isLinkValid ? "form-control" : "form-control is-invalid"} id="link" placeholder={link} name='link' required/>
                                <div className="invalid-feedback">Sorry, that link is either invalid or insecure. Provide secure link for eg. https: //xyz.com</div>
                            </div>
                        </fieldset>
                        <button type="submit" className="btn btn-primary mt-3"><i className="fa-regular fa-paper-plane fs-5"></i> Post</button>
                    </form>
                </div>
                <div className="col-5">
                    <img src="https://img.freepik.com/free-icon/link_318-897795.jpg?size=626&ext=jpg&ga=GA1.1.1330865133.1682601001&semt=robertav1_2_sidr" alt="" />
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
        return {
            redirect: {
                permanent: false,
                destination: "/user/signin"
            }
        }
    }

    return { props: { email } };
};