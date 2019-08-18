import React from 'react'
import styled from 'styled-components'
import { Container, Row, Col, Form, Button, ListGroup, Card } from 'react-bootstrap'
import swal from 'sweetalert2'

import AccessibleForm from '../../../components/AccessibleForm/AccessibleForm'
import client from '../../../services/client';

const ContainerHelper = styled.div`
  flex: 1;
  background: #f7f7f7;
  position: relative;

  padding: 1.5rem 0;
`

const StyledCard = styled(Card)`
  border: 1px solid #EEEEEE !important;
  border-radius: 5px !important;
  overflow: hidden;

  min-width: 250px !important;
`

const StyledListGroupItem = styled(ListGroup.Item)`
  display: flex !important;
  justify-content: space-between;
  align-items: center;
`

const XButton = styled.a`
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }
`

function Settings(props) {
  const { rules } = props

  const onSaveSubmit = values => {
    const { rules, setRules, } = props

    let updatedRulesObj = {
      ...rules,
      ...values,
    }

    if (['admins', 'freedays'].includes(Object.keys(values)[0])) {
      const arrayKey = Object.keys(values)[0]

      updatedRulesObj = {
        ...updatedRulesObj,
        [arrayKey]: [
          ...rules[arrayKey],
          values[arrayKey]
        ]
      }
    }

    client.post('/editRules', updatedRulesObj)
      .then(response => {
        swal.fire({
          title: 'Your changes have been saved!',
          type: 'success',
          timer: 1200,
          showConfirmButton: false,
        })
        setRules(response.data.rules)
      })
  }

  return (
    <ContainerHelper>
      <Container className="p-0 position-relative">
        <h3 className="font-weight-bold mb-4">
          Settings
        </h3>
        <h5 className="font-weight-bold my-3">
          Rules
        </h5>
        <hr/>
        <Row>
          <Col
            xs={4}
          >
            <h4 className="font-weight-bold mb-2">
              Max Offset Count
            </h4>
            <p>
              Set max offset count per month
            </p>
          </Col>
          <Col
            xs={8}
            className="d-flex flex-column align-items-start"
          >
            <p>
              Count: <strong>{rules.max_offsets}</strong>
            </p>
            <AccessibleForm
              initialValues={{
                max_offsets: ''
              }}
              onSubmit={onSaveSubmit}
              component={({ handleChange, handleSubmit, }) => (
                <Form
                  inline
                  onSubmit={handleSubmit}
                >
                  <Form.Control
                    name="max_offsets"
                    type="number"
                    placeholder="Enter Offset Count"
                    className="mr-3"
                    onChange={handleChange}
                  />
                  <Button type="submit">
                    Save
                  </Button>
                </Form>
              )}
            />
          </Col>
        </Row>
        <hr/>
        <Row>
          <Col
            xs={4}
          >
            <h4 className="font-weight-bold mb-2">
              Flexitime Hours
            </h4>
            <p>
              Set flexitime hours
            </p>
          </Col>
          <Col
            xs={8}
            className="d-flex flex-column align-items-start"
          >
            <p>
              Flexitime Hours: {
                rules.min_timein && (
                  <strong>{`${rules.min_timein} to ${rules.max_timein}`}</strong>
                )
              }
            </p>
            <AccessibleForm
              initialValues={{
                min_timein: '',
                max_timein: '',
              }}
              onSubmit={onSaveSubmit}
              component={({ handleChange, handleSubmit }) => (
                <Form
                  inline
                  onSubmit={handleSubmit}
                >
                  <Form.Control
                    name="min_timein"
                    type="text"
                    placeholder="Enter Min Hour"
                    className="mr-3"
                    onChange={handleChange}
                  />
                  <Form.Control
                    name="max_timein"
                    type="Text"
                    placeholder="Enter Max Hour"
                    className="mr-3"
                    onChange={handleChange}
                  />
                  <Button type="submit">
                    Save
                  </Button>
                </Form>
              )}
            />
          </Col>
        </Row>
        <hr/>
        <Row>
          <Col
            xs={4}
          >
            <h4 className="font-weight-bold mb-2">
              Days Off
            </h4>
            <p>
              Add or remove work days off
            </p>
          </Col>
          <Col
            xs={8}
            className="d-flex flex-column align-items-start"
          >
            <p>
              Days Off
            </p>

            <StyledCard className="mb-3">
              <ListGroup variant="flush">
                {
                  rules.freedays && rules.freedays.map(day => (
                    <StyledListGroupItem>
                      <h6 className="m-0">{day}</h6>
                      <XButton href="#" className="text-danger">
                        &times;
                      </XButton>
                    </StyledListGroupItem>
                  ))
                }
              </ListGroup>
            </StyledCard>
            
            <AccessibleForm
              initialState={{
                freedays: ''
              }}
              onSubmit={onSaveSubmit}
              component={({ handleChange, handleSubmit }) => (
                <Form
                  inline
                  onSubmit={handleSubmit}
                >
                  <Form.Control
                    name="freedays"
                    type="text"
                    placeholder="Add Day Off"
                    className="mr-3"
                    onChange={handleChange}
                  />
                  <Button type="submit">
                    Save
                  </Button>
                </Form>
              )}
            />
          </Col>
        </Row>
        <hr/>
        <Row>
          <Col
            xs={4}
          >
            <h4 className="font-weight-bold mb-2">
              Administrators
            </h4>
            <p>
              Add or remove administrators
            </p>
          </Col>
          <Col
            xs={8}
            className="d-flex flex-column align-items-start"
          >
            <p>
              Administrators
            </p>

            <StyledCard className="mb-3">
              <ListGroup variant="flush">
                {
                  rules.admins && rules.admins.map(admin => (
                    <StyledListGroupItem>
                      <h6 className="m-0">{admin}</h6>
                      <XButton href="#" className="text-danger">
                        &times;
                      </XButton>
                    </StyledListGroupItem>
                  ))
                }
              </ListGroup>
            </StyledCard>
            
            <AccessibleForm
              initialState={{
                admins: ''
              }}
              onSubmit={onSaveSubmit}
              component={({ handleChange, handleSubmit }) => (
                <Form
                  inline
                  onSubmit={handleSubmit}
                >
                  <Form.Control
                    name="admins"
                    type="text"
                    placeholder="Add Day Off"
                    className="mr-3"
                    onChange={handleChange}
                  />
                  <Button type="submit">
                    Save
                  </Button>
                </Form>
              )}
            />
          </Col>
        </Row>
      </Container>
    </ContainerHelper>
  )
}

export default Settings