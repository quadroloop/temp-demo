import React from 'react'
import styled from 'styled-components'
import { Container, Row, Col, Card, } from 'react-bootstrap'
import moment from 'moment'

import Table from '../../../components/Table/Table'

const Display = styled.h1`
  font-family: 'bebas', sans-serif;
  font-size: 2.5rem;
  letter-spacing: 0.33px;
`

const Subtitle = styled.p`
  text-transform: uppercase;
  font-weight: 900;
  font-size: 1rem;
  opacity: 0.7;
`

const Metric = styled.span`
  font-family: inherit;
  font-size: 1rem;
  opacity: 0.6;
`

const StyledCard = styled(Card)`
  border: 1px solid #EEEEEE !important;
  border-radius: 5px !important;
  overflow: hidden;
`

const Indicator = styled.div`
  width: 20px;
  height: 20px;

  border-radius: 5px;

  background-color: lightgreen;
`

function Main(props) {
  return (
    <Container>
      <Row className="mt-3">
        <Col xs={3}>
          <StyledCard>
            <Card.Body>
              <Card.Text>
                <Display>
                  { moment().format('MMM DD, YYYY').toString() }
                </Display>
                <Subtitle className="m-0">
                  { moment().format('dddd').toString() }
                </Subtitle>
              </Card.Text>
            </Card.Body>
          </StyledCard>
        </Col>
        <Col xs={3}>
          <StyledCard>
            <Card.Body>
              <Card.Text>
                <Display>
                  97<Metric>/120</Metric>
                </Display>
                <Subtitle className="m-0 text-success">
                  On-Time
                </Subtitle>
              </Card.Text>
            </Card.Body>
          </StyledCard>
        </Col>
        <Col xs={3}>
          <StyledCard>
            <Card.Body>
              <Card.Text>
                <Display>
                  13<Metric>/120</Metric>
                </Display>
                <Subtitle className="m-0 text-danger">
                  Late
                </Subtitle>
              </Card.Text>
            </Card.Body>
          </StyledCard>
        </Col>
        <Col xs={3}>
          <StyledCard>
            <Card.Body>
              <Card.Text>
                <Display>
                  4
                </Display>
                <Subtitle className="m-0 text-info">
                  For Approval
                  <span style={{ float: 'right' }}> 
                    <a href="">
                      View
                    </a>
                  </span>
                </Subtitle>
              </Card.Text>
            </Card.Body>
          </StyledCard>
        </Col>
      </Row>

      <h4 className="mt-5 font-weight-bold">
        Attendance
      </h4>

      <StyledCard className="mt-3">
        <Card.Body className="p-0">
          <Table
            columns={[
              {
                key: 'indicator',
                render: () => (
                  <Indicator />
                ),
                width: 52,
              },
              {
                key: 'name',
                title: 'Name',
                dataIndex: 'name',
              },
              {
                key: 'email',
                title: 'Email',
                dataIndex: 'email',
              },
              {
                key: 'timein',
                title: 'Time In',
                dataIndex: 'timein',
              },
              {
                key: 'timeout',
                title: 'Time Out',
                dataIndex: 'timeout',
              },
              {
                key: 'remarks',
                title: 'Remarks',
                dataIndex: 'remarks',
                width: 400,
              },
            ]}
            data={[
              {
                name: 'Bren Aviador',
                email: 'bren.aviador@whitecloak.com',
                timein: '8:00 am',
                timeout: '-',
                remarks: ''
              },
              {
                name: 'Bren Aviador',
                email: 'bren.aviador@whitecloak.com',
                timein: '8:00 am',
                timeout: '-',
                remarks: ''
              },
              {
                name: 'Bren Aviador',
                email: 'bren.aviador@whitecloak.com',
                timein: '8:00 am',
                timeout: '-',
                remarks: ''
              },
              {
                name: 'Bren Aviador',
                email: 'bren.aviador@whitecloak.com',
                timein: '8:00 am',
                timeout: '-',
                remarks: ''
              },
              {
                name: 'Bren Aviador',
                email: 'bren.aviador@whitecloak.com',
                timein: '8:00 am',
                timeout: '-',
                remarks: ''
              },
            ]}
          />
        </Card.Body>
      </StyledCard>
    </Container>
  )
}

export default Main