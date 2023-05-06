import React, { useState } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Nav } from 'reactstrap';
import { FaHome, FaLink, FaFeatherAlt, FaSignInAlt, FaSignOutAlt, FaGhost } from "react-icons/fa";

import { getCookie } from 'cookies-next';

export default function NavBar ({ email }: any){
    const [collapsed, setCollapsed] = useState(true);

    const toggleNavbar = () => {
      setCollapsed(!collapsed);
    }

    return(
      <header>
      <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3">
        <NavbarBrand href="/"><h2><FaFeatherAlt /> Sharing<span className='text-primary'>Clan</span></h2></NavbarBrand>
          <NavbarToggler onClick={toggleNavbar} className="mr-2" />
          <Collapse className="collapse navbar-collapse flex-sm-row-reverse" isOpen={collapsed} navbar>
            <Nav navbar>
              <NavItem>
                    <NavLink href="/"><FaHome /> Home</NavLink>
              </NavItem>
              <NavItem>
                    <NavLink href="/posts"><FaLink /> Posts</NavLink>
              </NavItem>
              {
                email
                ?
                <>
                <NavItem>
                      <NavLink href="/user/dashboard"><FaGhost/> Yours</NavLink>
                </NavItem>
                <NavItem>
                      <NavLink href="/api/signout"><FaSignOutAlt/> Exit clan</NavLink>
                </NavItem>
                </>
                :
                <NavItem>
                      <NavLink href="/user/signin"><FaSignInAlt/> Enter clan</NavLink>
                </NavItem>
            }
          </Nav>
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