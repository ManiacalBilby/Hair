import React, { Component } from 'react';
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
  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

const StylistLink = styled(Link)`
  text-decoration: none;
  color: white;
`

class SplashPage extends Component {
  render() {
    return (
      <Container>
        <Content>
          <SplashTitle>
            <h1>Hair Appointment Integration Record</h1>
          </SplashTitle>
          <StylistLink to={"/stylists"}>Continue to existing users</StylistLink>
        </Content>
      </Container>
    );
  }
}

export default SplashPage;