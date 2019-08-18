import React from 'react'
import styled from 'styled-components'
import { Container } from 'react-bootstrap'

const ContainerHelper = styled.div`
  flex: 1;
  background: #f7f7f7;
  position: relative;
`

function Employees(props) {
  return (
    <ContainerHelper>
      <Container className="p-0 position-relative">
        <h1>Employees</h1>
      </Container>
    </ContainerHelper>
  )
}

export default Employees