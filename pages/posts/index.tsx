import React, { useState, useEffect } from "react";
import { FcBrokenLink } from "react-icons/fc";
import { getCookie } from "cookies-next";
import { IPost } from "../../models/IIModels";
import {
  Spinner,
  ListGroup,
  ListGroupItem,
  List,
  ListInlineItem,
  Button,
} from "reactstrap";
import PaginateComponent from "../../components/Pagination";
import { FaFeather, FaLink } from "react-icons/fa";
import Image from "next/image";

export default function Posts({ email }: any) {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [clickedItemId, setClickedItemId] = useState<string>();

  const [imgPreviewItem, setImgPreviewItem] = useState<any>(null);
  const [hovering, setHovering] = useState(false);
  const [imgPreview, setImgPreview] = useState(null);
  const [imgHeightY, setImgHeightY] = useState(0);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPosts, setTotalPost] = useState<number>(0);

  const handlePreviewFetch = async (link: string) => {
    let res = await fetch("/api/preview?link=" + link);
    const data = await res.json();
    setImgPreview(data.image);
    localStorage.setItem(link, data.image);
  };

  const fetchPosts = async (currentPage: any) => {
    const response = await fetch(
      "api/post?" +
        new URLSearchParams({
          pagination: "5",
          page: currentPage,
        })
    );
    const data = await response.json();
    setPosts(data.posts);
    setTotalPost(data.totalPosts);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts(currentPage);
  }, [clickedItemId, currentPage]);

  if (loading) {
    return (
      <div className="container">
        <Spinner />
      </div>
    );
  }

  const handleClick = (id: string) => {
    const reqOpts = {
      method: "PUT",
    };
    fetch("api/post?id=" + id, reqOpts).then((res) => res.json());
    setClickedItemId(id);
  };

  const handleMouseEnter = (e: any, item: any) => {
    setImgHeightY(e.clientY - 90);
    setHovering(true);
    setImgPreviewItem(item);
  };

  const handleMouseLeave = () => {
    setHovering(false);
    setImgPreviewItem(null);
    setImgPreview(null);
  };

  const PreviewLink = () => {
    const cachedImg = localStorage.getItem(imgPreviewItem.link);
    if (cachedImg) {
      return (
        <img
          className="img-preview"
          style={{
            position: "absolute",
            height: "150px",
            width: "250px",
            top: imgHeightY + "px",
          }}
          src={`data:image/jpeg;base64, ${cachedImg}`}
        />
      );
    } else {
      handlePreviewFetch(imgPreviewItem!.link);
    }
    if (!imgPreview)
      return (
        <div
          style={{
            position: "absolute",
            height: "150px",
            width: "250px",
            backgroundColor: "white",
          }}
        >
          <Spinner
            className="img-preview"
            style={{ position: "absolute", top: imgHeightY + "px", left: "150px" }}
          />
        </div>
      );

    return (
      <img
        className="img-preview"
        style={{
          position: "absolute",
          height: "150px",
          width: "250px",
          top: imgHeightY + "px",
        }}
        src={`data:image/jpeg;base64, ${imgPreview}`}
      />
    );
  };

  const nextPage = (pageNumber: any) => {
    setCurrentPage(pageNumber);
    setPosts([]);
    fetchPosts(currentPage);
  };

  let numberofpage = 0;
  if (totalPosts % 5 == 0) numberofpage = Math.floor(totalPosts / 5);
  else numberofpage = Math.floor(totalPosts / 5) + 1;

  return (
    <div className="posts">
      <div className="container p-2 position-relative">
      {hovering && <PreviewLink />}
        <div className="row">
          <div className="col-8">
            <h3 className="my-4">Featured</h3>
            <ListGroup>
              {posts.map(p => 
                <ListGroupItem className="bg-color list-group color-text mb-1">
                  <List type="inline">
                    <ListInlineItem>
                      <Image
                        src={`/images/man2.png`}
                        className="img-fluid  p-2"
                        alt="..."
                        width={100}
                        height={150}
                      />
                    </ListInlineItem>
                    <ListInlineItem>{p.title}</ListInlineItem>
                    <ListInlineItem className="float-end pt-4">
                      <span>Total Clicks: {p.clicked}</span>
                    </ListInlineItem>

                    <ListInlineItem className="pt-3">
                      <a
                      onMouseEnter={(e) => handleMouseEnter(e, p)}
                      onMouseLeave={handleMouseLeave}
                      href={p.link}
                      onClick={() => handleClick(p._id)}
                      target="_blank"
                    >
                      <FaLink />
                    </a>
                    </ListInlineItem>
                  </List>
                </ListGroupItem>
              )}

              {/*<ListGroupItem className="bg-color mt-2 list-group color-text">
                <List type="inline">
                  <ListInlineItem>
                    <Image
                      src="/../public/img/girl1.png"
                      className="img-fluid p-2"
                      alt="..."
                      width={100}
                      height={150}
                    />
                  </ListInlineItem>
                  <ListInlineItem>2. Sajani Paudel</ListInlineItem>
                  <ListInlineItem className="float-end pt-4">
                    <span>Total Clicks: 4</span>
                  </ListInlineItem>

                  <ListInlineItem className="pt-3">
                    <FaLink />
                  </ListInlineItem>
                </List>
              </ListGroupItem>
              <ListGroupItem className="bg-color mt-2 list-group color-text">
                <List type="inline">
                  <ListInlineItem>
                    <Image
                      src="/../public/img/man2.png"
                      className="img-fluid  p-2"
                      alt="..."
                      width={100}
                      height={150}
                    />
                  </ListInlineItem>
                  <ListInlineItem>3. Brikram Bista</ListInlineItem>
                  <ListInlineItem className="float-end pt-4">
                    <span>Total Clicks: 4</span>
                  </ListInlineItem>

                  <ListInlineItem className=" pt-3">
                    <FaLink />
                  </ListInlineItem>
                </List>
              </ListGroupItem>
              <ListGroupItem className="bg-color my-2 list-group color-text">
                <List type="inline">
                  <ListInlineItem>
                    <Image
                      src="/../public/img/girl2.png"
                      className="img-fluid p-2"
                      alt="..."
                      width={100}
                      height={150}
                    />
                  </ListInlineItem>
                  <ListInlineItem>4. Majnu Timilsina</ListInlineItem>
                  <ListInlineItem className="float-end pt-4">
                    <span>Total Clicks: 4</span>
                  </ListInlineItem>

                  <ListInlineItem className="pt-3">
                    <FaLink />
                  </ListInlineItem>
                </List>
              </ListGroupItem>
              */}
            </ListGroup>
          </div>
              

          <div className="col-4 p-2">
            <h3 className="my-4">Category</h3>
            <List type="unstyled">
              <li>Facebook</li>
              <li>Instagram</li>
              <li>Twitter</li>
              <li>Twitch</li>
            </List>

            <h3>Featured Posts</h3>
            <List type="unstyled">
              <li>Facebook</li>
              <li>Instagram</li>
              <li>Twitter</li>
            </List>
          </div>
        </div>
        {/* {hovering && <PreviewLink />}
        {!loading && posts.length == 0 && <h6>0 Posts found.</h6>}
        {posts.map((p) => (
          <div className="row mb-1" key={p._id}>
            <div className="col">
              <div className="card">
                <div className="card-header d-flex justify-content-between bg-color">
                  <h5>
                    <i className="fa-solid fa-link"></i> {p.title}
                  </h5>
                  <p>Clicks: {p.clicked} </p>
                </div>
                <div className="card-body bg-color">
                  <p className="card-text d-flex justify-content-between">
                    <a
                      onMouseEnter={(e) => handleMouseEnter(e, p)}
                      onMouseLeave={handleMouseLeave}
                      href={p.link}
                      onClick={() => handleClick(p._id)}
                      target="_blank"
                    >
                      <FcBrokenLink /> {p.link}
                    </a>
                    <p>
                      Posted on:{" "}
                      <span className="text-muted">
                        {new Date(p.published).toLocaleString()}
                      </span>
                    </p>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-3">
              {p.postedBy.IsVerified ? (
                <h3 className="mt-3">
                  <FaFeather className="text-muted" />
                </h3>
              ) : (
                <p className="mt-3 text-secondary">Unverified member</p>
              )}
              <h4 className="position-absolute top-50 start-50 translate-middle text-primary">
                {" "}
                {p.postedBy.Username}
              </h4>
            </div>
            {/* <div className="col-2 badge badge-pill position-relative border border-primary">
              {p.postedBy.IsVerified ? (
                <h3 className="mt-3">
                  <FaFeather className="text-muted" />
                </h3>
              ) : (
                <p className="mt-3 text-secondary">Unverified member</p>
              )}
              <h4 className="position-absolute top-50 start-50 translate-middle text-primary">
                {" "}
                {p.postedBy.Username}
              </h4>
            </div> */}
        {/*   </div>
        ))} */}

        {totalPosts > 5 && (
          <PaginateComponent
            pages={numberofpage}
            nextPage={nextPage}
            currentPage={currentPage}
          />
        )}
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
