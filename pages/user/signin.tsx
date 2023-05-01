import React, { useState } from 'react';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router'
import { Alert } from 'reactstrap'

export default function Signin({email}: any ) {
    const [visibleError, setVisibleError] = useState<boolean>(true);

    const router = useRouter()
    const { msg } = router.query

    const onDismiss = () => setVisibleError(false);

    return (
        <div className='container p-y register'>
            <div className='row'>
                <div className='col-6'>
                    <img height={"600px"} width={"900px"} src='https://img.freepik.com/free-vector/tropical-island-cartoon-concept-with-stone-land-covered-with-forest-vector-illustration_1284-78231.jpg?size=626&ext=jpg&ga=GA1.1.1599537497.1682860454&semt=robertav1_2_sidr' />
                </div>
                <div className='col mt-5 pt-5'>
                    <div className='bg-light p-4'>
                    {msg ?
                        <Alert color="warning" isOpen={visibleError} toggle={onDismiss}>{ msg }</Alert>
                        :
                        <></>
                    }
                        <h2>Enter clan</h2>
                        <form action='/api/authentication' method='POST'>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <input required type="email" className="form-control" id="email" aria-describedby="emailHelp" name='email' placeholder='email'/>
                                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="pass" className="form-label">Password</label>
                                <input required type="password" className="form-control" id="pass" name='password' placeholder='password'/>
                            </div>

                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                        <p className='pt-3'>Not yet a clan member? <a href='/user/register'>Join Clan</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps(context: any) {
    const req = context.req
    const res = context.res
    var email = getCookie('email', { req, res });
    if (email != undefined){
        return {
            redirect: {
                permanent: false,
                destination: "/"
            }
        }
    }
    return { props: {email:false} };
};