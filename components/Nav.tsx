import React from "react"
import { FcLink, FcPlus, FcHome } from "react-icons/fc";

const NavBar = () => {
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">SharingClan</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse float-right" id="navbarColor03">
      <ul className="navbar-nav me-auto">
        <li className="nav-item">
          <a className="nav-link active" href="/"><FcHome /> Home
            <span className="visually-hidden">(current)</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/posts"><FcLink /> Posts</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/create"><FcPlus /> Create</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
    )
}

export default NavBar;