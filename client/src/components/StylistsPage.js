import React from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components'
/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from 'prop-types'
/* eslint-enable import/no-extraneous-dependencies */

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 90vh;
`

const AllStylistCards = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 75%;
  margin-top: 50px;
`

const StylistCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
  margin-right: 10px;
  &:hover {
  -webkit-box-shadow: 10px 10px 18px 5px rgba(128,128,128,0.19);
  -moz-box-shadow: 10px 10px 18px 5px rgba(128,128,128,0.19);
  box-shadow: 10px 10px 18px 5px rgba(128,128,128,0.19);
  };
`
const ProfileImage = styled.img`
  width: 200px;
  height: 225px;
  margin-bottom: 25px;
`
const ProfileLink = styled(Link)`
  text-decoration: none;
  color: black;
  width: 250px;
`

const StylistsPage = ({ ...props }) => (
  <Wrapper>
    <AllStylistCards>
      {props.stylists.map(stylist => (
        <ProfileLink key={stylist.id} to={`/stylists/${stylist.id}/appointments`}>
          <StylistCard>
            <h2>{stylist.first_name} {stylist.last_name}</h2>
            <ProfileImage src={stylist.photo_url} alt={stylist.first_name} />
          </StylistCard>
        </ProfileLink>
          ))}
    </AllStylistCards>
  </Wrapper>
)

StylistsPage.propTypes = {
  stylists: PropTypes.oneOfType([
    PropTypes.object,
  ]).isRequired,
}

export default StylistsPage;
