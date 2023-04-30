import React from 'react';
import { FcLink, FcAdvertising, FcPhoneAndroid } from "react-icons/fc";
import { FaFeather } from "react-icons/fa";

import { getCookie } from 'cookies-next';
import { Badge } from 'reactstrap'

export default function Home({ email }: any){
  return (
    <div>
            <div className="main">
                <div className="container-fluid ">
                    <div className="row d-flex">
                        <div className="col align-middle">
                            <div className="px-2 py-2">
                                <img src="https://img.freepik.com/free-vector/online-connection-concept-illustration_114360-4619.jpg?t=st=1682600997~exp=1682601597~hmac=dc6ef2301d66fb790a7149d19d2813c698e1cce8b6fad917b9d46874e28cba01" className="img-fluid" alt="..." />
                            </div>
                        </div>
                        <div className="col">
                            <div className="px-5 py-5 mt-5">
                                <div className="px-2 py-2 align-middle">
                                    <h4>Share links with our clan.</h4>
                                    <p className="lead"> An online community platform to share social media links.</p>
                                    <p className="text-primary">Publish, Share links and Reachout to clan</p>
                                </div>
                                {email ?
                                <div className="px-2 py-2">
                                    <Badge color='secondary' className='p-3'> Welcome, <FaFeather className='fs-3'/> {email}</Badge>
                                </div>
                                :
                                <div className="px-2 py-2">
                                    <a href='/subscribe' className="btn btn-info">Become a clan member</a>
                                </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container marketing mb-5">
                <div className="row">
                    <div className="col-lg-4 border-top border-bottom p-5 d-flex flex-column align-items-center">
                        <FcLink className='icons'/>
                        <h2 className="fw-normal">Post a link</h2>
                        <p className="text-center">Post any links on ShareClan platform.</p>
                    </div>
                    <div className="col-lg-4 border-top border-bottom p-5  d-flex flex-column align-items-center">
                        <FcAdvertising className='icons'/>
                        <h2 className="fw-normal">We Broadcast</h2>
                        <p className="text-center">ShareClan broadcast to clan members</p>
                    </div>
                    <div className="col-lg-4 border-top border-bottom p-5 d-flex flex-column align-items-center">
                        <FcPhoneAndroid className='icons'/>
                        <h2 className="fw-normal">Community is notified</h2>
                        <p className="text-center">All clan members in our platform receives notification.</p>
                    </div>
                </div>
            </div>     

            <div className="footer p-5 bg-primary text-light">
                  <div className="container-fluid">
                      <footer>
                          <div className="">
                              <div className="row">
                                  <div className="col-md-6 footer-column">
                                      <ul className="nav flex-column">
                                          <li className="nav-item">
                                              <span className="footer-title">Company</span>
                                          </li>
                                          <li className="nav-item">
                                              <a className="nav-link" href="#">About us</a>
                                          </li>
                                          <li className="nav-item">
                                              <a className="nav-link" href="#">News and articles</a>
                                          </li>
                                      </ul>
                                  </div>
                                  <div className="col-md-6 footer-column">
                                      <ul className="nav flex-column">
                                          <li className="nav-item">
                                              <span className="footer-title">Contact & Support</span>
                                          </li>
                                          <li className="nav-item">
                                              <a className="nav-link" href="#"><i className="fas fa-envelope"></i>Contact us</a>
                                          </li>
                                          <li className="nav-item">
                                              <a className="nav-link" href="#"><i className="fas fa-star"></i>Give feedback</a>
                                          </li>
                                      </ul>
                                  </div>
                              </div>

                              <div className="row text-center pt-5 mt-5">
                                  <div className="col-md-4 box">
                                      <span className="copyright quick-links">Copyright &copy; 2023, ShareCommunity </span>
                                  </div>
                                  <div className="col-md-4 box">
                                      <ul className="list-inline social-buttons">
                                          <li className="list-inline-item">
                                              <a href="#">
                                                  <i className="fab fa-twitter"></i>
                                              </a>
                                          </li>
                                          <li className="list-inline-item">
                                              <a href="#">
                                                  <i className="fab fa-facebook-f"></i>
                                              </a>
                                          </li>
                                          <li className="list-inline-item">
                                              <a href="#">
                                                  <i className="fab fa-linkedin-in"></i>
                                              </a>
                                          </li>
                                      </ul>
                                  </div>
                                  <div className="col-md-4 box">
                                      <ul className="list-inline quick-links">
                                          <li className="list-inline-item">
                                              <a href="#">Privacy Policy</a>
                                          </li>
                                          <li className="list-inline-item">
                                              <a href="#">Rules and Regulations</a>
                                          </li>
                                      </ul>
                                  </div>
                              </div>
                          </div>
                    </footer>
                </div>
           </div>
      </div>)
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