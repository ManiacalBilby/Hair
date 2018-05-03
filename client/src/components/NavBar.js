import React from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const StyledNavBar = styled.div`
  display: flex;
  align-items: center;
  height: 70px;
  background-color: teal;
  justify-content: space-between;
`

const Logo = styled.div`
  font-size: 2.75rem;
  margin-left: 10px;
  font-family: 'Dr Sugiyama', cursive;
`
// const UserPic = styled.img`
//   width: 75px;
//   height: 75px;
// `

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`

const NavBar = () => (
  <StyledNavBar>
    <StyledLink to="/">
      <Logo>
          Hair
      </Logo>
    </StyledLink>
    {/* <div>
          <UserPic src="http://www.freeiconspng.com/uploads/profile-icon-9.png" alt="profile placeholder" />
        </div> */}
  </StyledNavBar>
);

export default NavBar;
