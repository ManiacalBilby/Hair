import React, { Component } from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom'


const Wrapper = styled.div`
height: 100vh;
width: 100vw;
display: flex;
align-items: center;
justify-content: space-around;
align-content: center;
flex-wrap: wrap;
background-color: whitesmoke;
`

const AppointmentContainer = styled.div`
  background-image: url('https://i.imgur.com/7u5xGws.jpg?1');
  height: 200px;
  width: 300px;
  margin: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-size: cover;
  background-position: center;
  border-radius: 5%;
  &:hover {
    box-shadow: 6px 9px 14px 10px rgba(201,197,201,1);
  };
  /* background-attachment: fixed; */
  @media (min-width: 768px) {
    height: 300px;
    width: 500px;
  };
  @media (min-width: 1300px) {
    height: 400px;
    width: 600px;
  };
`
const ClientContainer = AppointmentContainer.extend`
background-image: url('https://i.imgur.com/hoKEA4v.jpg?2');
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center;
  color: gray;
  font-size: 2rem;
`

const StyledLink = styled(Link)`
text-decoration: none;
`

class ShowStylistPage extends Component {
  render() {
    return (
      <Wrapper>
        <StyledLink to={`/stylists/${this.props.match.params.id}/appointments`}>
          <AppointmentContainer>
            <Content>
              Appointments
          </Content>
          </AppointmentContainer>
        </StyledLink>
        <ClientContainer>
          <Content>
            Clients
          </Content>
        </ClientContainer>
      </Wrapper>
    );
  }
}

export default ShowStylistPage;