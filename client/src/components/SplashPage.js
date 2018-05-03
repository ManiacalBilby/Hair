import React from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Container = styled.div`
  background-image: url('http://thecollectiveasalon.com/wp-content/uploads/2016/09/16422807_1896329573931099_2335164450293826853_o.jpg');
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center;
  color: white;
`

const SplashTitle = styled.div`
  text-align: center;
  text-shadow: rgb(7, 7, 7) 2px 2px 5px;
  @media (min-width: 705px) {
    font-size: 1.25rem;
  };
  @media (min-width: 1000px) {
    font-size: 1.5rem;
  };
`

const StylistLink = styled(Link)`
  text-decoration: none;
  color: ghostwhite;
  text-shadow: rgb(7, 7, 7) 0 0 10px;
  &:hover {
    text-shadow: rgb(150, 150, 150) 2px 2px 10px;
    color: white;
  };
  @media (min-width: 675px) {
    font-size: 1.25rem;
  };
  @media (min-width: 1000px) {
    font-size: 1.5rem;
  };
`

const SplashPage = () => (
  <Container>
    <Content>
      <SplashTitle>
        <h1>Hair Appointment Integration Record</h1>
      </SplashTitle>
      <StylistLink to="/stylists">Continue to existing users</StylistLink>
    </Content>
  </Container>
)

export default SplashPage
