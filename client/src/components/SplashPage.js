import React, { Component } from 'react';
import styled from 'styled-components'

const Container = styled.div`
  background-image: url('http://thecollectiveasalon.com/wp-content/uploads/2016/09/16422807_1896329573931099_2335164450293826853_o.jpg');
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* background-repeat: no-repeat; */
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  /* position: relative; */

  /* padding-bottom: 66.650391%; */
  /* overflow: hidden; */
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center;
  /* position: absolute; */
  color: white;
  /* top: 0; bottom: 0; left: 30px; right: 30px; */
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

class SplashPage extends Component {
  render() {
    return (
        <Container>
        <Content>
          <SplashTitle>
            <h1>Hair Appointment Integration Record</h1>
          </SplashTitle>
          <Form action="">

            <label htmlFor="">Email</label>
            <input type="text" />

            <label htmlFor="">Password</label>
            <input type="text" />

          </Form>
        </Content>
      </Container>
    );
  }
}

export default SplashPage;