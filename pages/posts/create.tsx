import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    const [isLinkValid, setIsLinkValid] = useState(true);

    const router = useRouter();

    const titleChangeHandler = (e : any) => {
        setTitle(e.target.value)
    }

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

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const reqOpts = {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                title,
                link
            })
        }
        fetch('api/posts/create', reqOpts)
            .then(res => res.json())
        toast.success("🎉 New post created.")
        router.replace('/posts')
    }

    const disabledButton = link.length > 0 && isLinkValid ? false : true;

    return (
        <>
            <div className="row mt-5">
                <div className="col">
                    <form onSubmit={handleSubmit}>
                        <fieldset>
                            <legend>Post a link to share with clan.</legend>
                            <div className="form-group">
                                <label htmlFor="title" className="form-label mt-4">Title</label>
                                <input type="text" className="form-control" id="title" placeholder="Enter title." onChange={(e) => titleChangeHandler(e)} />
                            </div>
                            <div className="form-group ">
                                <label htmlFor="link" className="form-label mt-4">Link</label>
                                <input required type="text" className={isLinkValid ? "form-control" : "form-control is-invalid"} id="link" placeholder="Enter link." onChange={(e) => linkChangeHandler(e)} />
                                <div className="invalid-feedback">Sorry, that link is either invalid or insecure. Provide secure link for eg. https: //xyz.com</div>
                            </div>
                        </fieldset>
                        <button type="submit" disabled={disabledButton} className="btn btn-primary mt-3"><i className="fa-regular fa-paper-plane fs-5"></i> Post</button>
                    </form>
                </div>
                <div className="col-5">
                    <img src="https://img.freepik.com/free-icon/link_318-897795.jpg?size=626&ext=jpg&ga=GA1.1.1330865133.1682601001&semt=robertav1_2_sidr" alt="" />
                </div>
            </div>
        </>
    )
}

export default CreatePost;