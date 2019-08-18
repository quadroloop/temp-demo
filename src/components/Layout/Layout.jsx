import React from 'react'
import styled from 'styled-components'
import Logo from '../../assets/images/logo-light.png'


const Container = styled.div`
  width: 100%;
  min-height: 100vh;

  background: var(--bg-color-dark);

  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  padding: 2rem;
`

const Title = styled.h1`
  color: #ffffff;
  text-align: center;
  font-weight: 300;
  margin: 0;
`

function Layout(props) {
  const { children } = props

  return (
    <Container>
      <Header>
        <center>
          <img src={Logo} id="wc-logo" className="animated fadeInDown"></img>
        </center>
      </Header>
      {children}
    </Container>
  )
}

export default Layout