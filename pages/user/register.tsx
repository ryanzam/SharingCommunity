import React, { useState } from 'react';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router'
import { Alert } from 'reactstrap'

export default function Register( {email}: any ) {
    const [visibleError, setVisibleError] = useState<boolean>(true);

    const router = useRouter()
    const { msg } = router.query

    const onDismiss = () => setVisibleError(false);

    return (
        <div className='container p-y register'>
            {msg ?
                 <Alert color="warning" isOpen={visibleError} toggle={onDismiss}>{ msg }</Alert>
                :
                    <></>
            }
            <div className='row'>
                <div className='col-6'>
                    <div>
                        <h2>Become a clan member</h2>

                        <form action='/api/register' method='POST'>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="username">Username</label>
                                <input  type="text" className="form-control" id="username" name='username' placeholder="username" required/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name='email' placeholder="email" required/>
                                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="pass" className="form-label">Password</label>
                                <input required type="password" className="form-control" id="pass" name='password' placeholder="password" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="passconfirm" className="form-label">Confirm Password</label>
                                <input required type="password" className="form-control" id="passconfirm" name='confirmPassword' placeholder="confirmPassword"/>
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
                <div className='col'>
                    <img src='https://images.pexels.com/photos/14797140/pexels-photo-14797140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' height={"700px"}/>
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
    else {

    }
    return { props: {email:false} };
};