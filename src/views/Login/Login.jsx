import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import GoogleLogin from 'react-google-login'
import swal from 'sweetalert2'

import Logo from '../../assets/images/logo-light.png'
import Layout from '../../components/Layout/Layout'
import Button from '../../components/Button/Button'

import client from '../../services/client'

const LoginSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin-top: -103px;
`

const LogoXTempo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-bottom: 3rem;
`

const LogoLight = styled.img.attrs({ src: Logo })`
  max-width: 100px;
`

const Tempo = styled.h1`
  font-weight: 300 !important;
  color: #ffffff;
`

class Login extends Component {
  onLoginRequest = () => {
    swal.fire({
      title: 'Logging you in...',
      onOpen: () => {
        swal.showLoading()
      }
    })
  }

  onLoginSuccess = response => {
    const { history, userAuthenticate } = this.props
    const { profileObj, } = response

    client.post('/addUser', {
      email: profileObj.email,
      name: profileObj.name,
    })
      .then(response => {
        console.log(response)

        swal.fire({
          title: 'You are now logged in!',
          type: 'success',
          timer: '1200',
          showConfirmButton: false,
          onClose: () => {
            userAuthenticate(profileObj)
            history.push('/')
          }
        })
      })
  }

  onLoginFailure = () => {
    swal.close()
  }

  render() {
    const { profileObj, } = this.props

    if (Object.keys(profileObj).length) {
      return <Redirect to="/" />
    }

    return (
      <Layout>
        <LoginSection>
          <LogoXTempo>
            <LogoLight />
            <Tempo>
              &nbsp; &times; &nbsp;tempo
            </Tempo>
          </LogoXTempo>
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            render={({ onClick }) => (
              <Button
                onClick={onClick}
                icon={() => <i className="fab fa-google" />}
              >
                Login with Google
              </Button>
            )}
            onSuccess={this.onLoginSuccess}
            onFailure={this.onLoginFailure}
            onRequest={this.onLoginRequest}
          />
        </LoginSection>
      </Layout>
    )
  }
}

export default withRouter(Login)