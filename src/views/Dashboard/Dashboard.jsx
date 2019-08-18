import React from 'react'
import { withRouter, Route, Link } from 'react-router-dom'
import styled, { css, } from 'styled-components'
import { Container, Navbar, Nav, } from 'react-bootstrap'

import client from '../../services/client'
import Logo from '../../assets/images/logo-light.png'

import Main from './pages/Main'
import Employees from './pages/Employees';
import Settings from './pages/Settings';

let ACTIVE_TAB

const FlexContainer = styled.div`
  display: flex;
  flex-flow: column;

  min-height: 100vh;
  background: #f7f7f7;

  > .container {
    padding: 0;
  }
`

const StyledNavBar = styled(Navbar)`
  position: relative;
  background: transparent;
  padding: 0 !important;

  flex-flow: column !important;

  &:before {
    content: ' ';
    position: absolute;
    background: linear-gradient(to right, #141723, #141E30);
    width: 100%;
    height: 250px;
  }
`

const StyledNavLink = styled(Link)`
  position: relative;
  padding: 1rem 0;
  margin-left: 1.5rem;
  overflow: hidden;

  color: #EEEEEE;

  &:first-child {
    margin-left: 0;
  }

  &:after {
    content: ' ';
    position: absolute;
    left: 0;
    bottom: -4px;

    opacity: 0;

    ${props => {
      if (props.alias === ACTIVE_TAB) {
        return css`
          opacity: 1;
        `  
      }
    }}

    width: 100%;
    height: 8px;
    border-radius: 4px;
    background: #f7f7f7;
  }

  &:hover {
    text-decoration: none;
    color: #f7f7f7;

    &:after {
      opacity: 1;
    }
  }
`

const StyledBrand = styled(Navbar.Brand)`
  padding: 1rem 0 !important;
`

class Dashboard extends React.Component {
  componentDidMount() {
    const { rules, setRules, events, setEvents, } = this.props

    if (!Object.keys(rules).length) {
      client.get('/getRules')
        .then(response => {
          setRules(response.data.users)
        })  
    }

    if (!events.length) {
      client.get('/getEvents')
        .then(response => {
          setEvents(response.data.events)
        })
    }
  }

  render() {
    const { match, location, rules, setRules, } = this.props
    const splitPath = location.pathname.split('/')

    ACTIVE_TAB = splitPath[splitPath.length - 1]

    return (
      <FlexContainer>
        <StyledNavBar
          bg="dark"
          variant="dark"
        >
          <Container className="position-relative pt-5">
            <StyledBrand>
              <img
                src={Logo}
                style={{
                  maxWidth: '4rem',
                }}
              />
              &nbsp; &times; &nbsp;tempo
          </StyledBrand>
          </Container>
          <Container className="position-relative">
            <Navbar.Collapse
              id="basic-navbar-nav"
            >
              <Nav
                className="mr-auto"
              >
                <StyledNavLink
                  alias="dashboard"
                  to={match.url}
                >
                  Dashboard
              </StyledNavLink>
                <StyledNavLink
                  alias="employees"
                  to={`${match.url}/employees`}
                >
                  Employees
              </StyledNavLink>
                <StyledNavLink>
                  Leaves
              </StyledNavLink>
                <StyledNavLink
                  alias="settings"
                  to={`${match.url}/settings`}
                >
                  Settings
              </StyledNavLink>
              </Nav>
              <Nav
                className="ml-auto"
              >
                <StyledNavLink>
                  Logout
              </StyledNavLink>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </StyledNavBar>
        <Route
          path={match.path}
          component={Main}
          exact
        />
        <Route
          path={`${match.path}/employees`}
          component={Employees}
        />
        <Route
          path={`${match.path}/settings`}
          render={() => (
            <Settings
              rules={rules}
              setRules={setRules}
            />
          )}
        />
      </FlexContainer>
    )
  }
}

export default withRouter(Dashboard)