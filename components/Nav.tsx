import React, { useState } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { FaHome, FaLink, FaFeatherAlt, FaSignInAlt, FaSignOutAlt, FaGhost } from "react-icons/fa";

import { getCookie } from 'cookies-next';

export default function NavBar ({ email }: any){
    const [collapsed, setCollapsed] = useState(true);

    const toggleNavbar = () => {
      setCollapsed(collapsed);
    }

    return(
      <header>
      <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
        <NavbarBrand href="/"><FaFeatherAlt /> SharingClan</NavbarBrand>
          <NavbarToggler onClick={toggleNavbar} className="mr-2" />
          <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={collapsed} navbar>
            <ul className="navbar-nav flex-grow">
              <NavItem>
                    <NavLink className="text-dark" href="/"><FaHome /> Home</NavLink>
              </NavItem>
              <NavItem>
                    <NavLink className="text-dark" href="/posts"><FaLink /> Posts</NavLink>
              </NavItem>
              {
                email
                ?
                <>
                <NavItem>
                      <NavLink className="text-dark" href="/user/dashboard"><FaGhost/> Yours</NavLink>
                </NavItem>
                <NavItem>
                      <NavLink className="text-dark" href="/user/authentication"><FaSignOutAlt/> Exit clan</NavLink>
                </NavItem>
                </>
                :
                <NavItem>
                      <NavLink className="text-dark" href="/user/signin"><FaSignInAlt/> Enter clan</NavLink>
                </NavItem>
            }
          </ul>
        </Collapse>
      </Navbar>
    </header>
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