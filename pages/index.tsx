import React, { useEffect, useState } from "react";
import { FaFeather, FaLink, FaBullhorn, FaMailBulk } from "react-icons/fa";

import { getCookie } from "cookies-next";
import { Badge } from "reactstrap";
import Image from "next/image";
import { IPost } from "../models/IIModels";

export default function Home({ email }: any) {
  const [featuredPosts, setFeaturedPosts] = useState<IPost[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch(`/api/featuredposts`);
      const data = await res.json();
      setFeaturedPosts(data);
    }
    fetchPosts();
  }, [])

  return (
    <div>
      <div className="main">
        <div className="container">
          <div className="row d-flex">
            <div className="col align-middle">
              <div className="px-2 py-2 mt-4 mb-4">
                <Image
                  src="/images/index1.jpg"
                  className="img-fluid"
                  alt="..."
                  width={650}
                  height={300}
                />
              </div>
            </div>
            <div className="col">
              <div className="px-3 py-4 mt-4 mb-4 text-center">
                <div className="px-2 py-1 align-middle ">
                  <h2>Share links with our clan.</h2>
                  <p className="lead pb-3">
                    {" "}
                    An online community platform to share social media links.
                  </p>
                  <p
                    className="text-primary"
                  >
                    Publish, Share links and Reachout to clan
                  </p>
                </div>
                {email ? (
                  <div className="px-2 py-2">
                    <Badge color="secondary" className="p-3">
                      {" "}
                      Welcome, <FaFeather className="fs-3" /> {email}
                    </Badge>
                  </div>
                ) : (
                  <div className="px-2 py-2">
                    <a href="/user/register" className="btn btn-primary btn-lg">
                      Become a clan member
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container marketing mb-5">
        <h2 className=" text-center">How we work?</h2>
        <div className="row text-center">
          <div className="col-lg-4 p-5 d-flex flex-column align-items-center">
            <FaLink className="icons" />
            <div className=" pt-4 work-bg">
              <h2 className="fw-normal">Post a link</h2>
              <p className="text-center text-primary">
                Post any links on ShareClan platform
              </p>
            </div>
          </div>
          <div className="col-lg-4 p-5  d-flex flex-column align-items-center">
            <FaBullhorn className="icons" />
            <div className=" pt-4 work-bg">
              <h2 className="fw-normal">We Broadcast</h2>
              <p className="text-center text-primary">
                ShareClan broadcast to clan members
              </p>
            </div>
          </div>
          <div className="col-lg-4 p-5 d-flex flex-column align-items-center">
            <FaMailBulk className="icons" />
            <div className=" pt-4 work-bg">
              <h2 className="fw-normal">Clan is notified</h2>
              <p className="text-center text-primary">
                All clan members recieves notification
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row d-flex pb-3">
          <div className="col">
            <h3>Featured Links</h3>
            <table className="table mt-4">
              <tbody>
                {featuredPosts.map((f: IPost, idx) => 
                <tr className={idx %2 == 0 ? "bg-color" : ""} key={idx}>
                    <th scope="row">{idx + 1}</th>
                    <th>{f.title}</th>
                    <th>Clicks: {f.clicked}</th>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="col">
            <Image
              src="/images/index2.jpg"
              className="img-fluid"
              alt="index image"
              width={650}
              height={300}
            />
          </div>
        </div>
      </div>

      <div className="footer px-5 pt-5 text-light">
        <div className="container-fluid">
          <footer>
            <div className="">
              <div className="row">
                <div className="col-md-6 mb-4 footer-column">
                  <ul className="nav flex-column">
                    <li className="nav-item">
                      <h3 className="footer-title">Company</h3>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        About us
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        News and articles
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="col-md-6 mb-4 footer-column">
                  <ul className="nav flex-column">
                    <li className="nav-item">
                      <h3 className="footer-title">Contact & Support</h3>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        <i className="fas fa-envelope"></i>Contact us
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        <i className="fas fa-star"></i>Give feedback
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <hr />
              <div className="row after-footer text-center pt-1 mt-4">
                <div className="col-md-4 box">
                  <span className="copyright quick-links">
                    Copyright &copy; 2023, ShareCommunity{" "}
                  </span>
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
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const req = context.req;
  const res = context.res;
  var email = getCookie("email", { req, res });
  if (email == undefined) {
    email = false;
  }
  return { props: { email } };
}
