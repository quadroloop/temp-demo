import React, { Component, } from 'react'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import styled, { css, } from 'styled-components'
import media from 'styled-media-query'
import { Tab, Tabs, Table } from 'react-bootstrap'
import Layout from '../../components/Layout/Layout'
import client from '../../services/client';
import swal from 'sweetalert2';
import Axios from 'axios';

const FlexLayout = styled.div`
  display: flex;
  flex-direction: row;
`

const Container = styled.div`
  flex: 1;
  margin-top: -103px;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  padding: 1.5rem;
`

const WelcomeText = styled.h1`
  font-size: 3rem;
  font-weight: 300;
  text-align: center;
  margin: 0;
  color: #ffffff;

  ${media.lessThan('small')`
    font-size: 1.5rem;
  `}
`

const TimeContainer = styled.div`
  --circle-diameter: 450px;

  position: relative;

  width: var(--circle-diameter);
  height: var(--circle-diameter);

  background: var(--color-primary);

  border-radius: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  overflow: hidden;
  transform: scale(1);

  box-shadow: 0px 0px 20px 0px var(--color-primary-glow);
  transition: all var(--animation-duration) var(--animation-easing);

  cursor: pointer;
  user-select: none;

  ${props => {
    if (props.disabled) {
      return css`
        pointer-events: none;
      `
    }
  }}

  ${media.lessThan('small')`
    width: calc(var(--circle-diameter) - 200px);
    height: calc(var(--circle-diameter) - 200px);
  `}

  &:before {
    content: ' ';
    position: absolute;

    width: 100%;
    height: 100%;

    opacity: 0;

    transition: all var(--animation-duration) var(--animation-easing);
  }

  &:active {
    transform: scale(0.9);
    transition: all calc(var(--animation-duration) / 2) var(--animation-easing);
  }

  &:hover {
    cursor: pointer;
  }

  ${props => {
    if (props.loading) {
      return css`
        opacity: 0.7;
      `
    }
  }}

  ${props => {
    if (props.isTimedIn) {
      if (props.userTime) {
        return css`
          ${() => {
            if (props.userTime === 'ON TIME') {
              return css`background: linear-gradient(to bottom right, var(--color-success-light), var(--color-success));`
            } else {
              return css`
                background: linear-gradient(to bottom right, var(--color-danger), var(--color-danger-light));
                box-shadow: 0px 0px 20px 0px var(--color-danger-glow);
              `
            }
          }}
          transform: scale(1.1);
          transition: all calc(var(--animation-duration) / 2) var(--animation-easing);

          &:before {
            opacity: 1;
            transition: all calc(var(--animation-duration) / 2) var(--animation-easing);
          }`
      }
    }
  }}
`

const BackgroundHelper = styled.div`
  position: relative;

  width: calc(var(--circle-diameter) - 25px);
  height: calc(var(--circle-diameter) - 25px);

  background: var(--bg-color-dark);

  border-radius: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: #ffffff;

  ${media.lessThan('small')`
    width: calc(var(--circle-diameter) - 200px - 25px);
    height: calc(var(--circle-diameter) - 200px - 25px);
  `}
`

const DashedContainer = styled.div`
  width: 400px;
  height: 400px;

  border: 2px dashed #ffffff;
  border-radius: 100%;
`

const StyledTime = styled.h1`
  font-family: 'Dosis', sans-serif;
  font-size: 5rem;
  margin: 0;
  margin-bottom: 1rem;
  font-weight: 500;

  ${media.lessThan('small')`
    font-size: 2.5rem;
  `}
`

const TimeDescription = styled.p`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  opacity: 0.5;


  ${media.lessThan('small')`
    font-size: 1rem;
  `}
`

const Footer = styled.div`
  min-height: 3rem;
  color: #ffffff;
`

const Eclipse = styled.div.attrs({ className: 'lds-eclipse' })`
  display: none;
  ${props => props.loading && css`
    display: block;
  `}

  > div {
    width: calc(var(--circle-diameter) - 100px);
    height: calc(var(--circle-diameter) - 100px);

    ${media.lessThan('small')`
      width: calc(var(--circle-diameter) - 275px);
      height: calc(var(--circle-diameter) - 275px);
    `}
  }
`

const setProfileImg = (img) => {
  console.log(img);
  document.getElementById('profileimg').src = img.imageUrl;
}

const hideLogs = () => {
  document.getElementById('prevlogs').style.display = "none";
}

const showLogs = () => {
  document.getElementById('timeline').innerHTML = "";

  client.post("/getTimesheet", { id: localStorage.user })
    .then(res => {
      if (res.data.status === "ok" && res.data.timesheet.length > 0) {
        res.data.timesheet.reverse().forEach(timelog => {
          let cardtype = timelog.status;
          let month = moment(timelog.date).format("MMM").toUpperCase();
          let day = moment(timelog.date).format('D');
          switch (cardtype) {
            case 'LATE':
              document.getElementById('timeline').innerHTML += `
               <div class="card time-card ">

               <div class="badge-danger late-tag">
                 <span>L<br />A<br />T<br />E</span>
               </div>

               <div class="cell border-right">
                 <small>${month}</small>
                 <h3>${day}</h3>
               </div>

               <div class="cell border-right text-active">
                 <small>TIME-IN</small>
                 <h3>${timelog.timein}</h3>
               </div>

               <div class="cell text-active">
                 <small>TIME-OUT</small>
                 <h3>${timelog.timeout}</h3>
               </div>

             </div>

               `
              break;
            default:
              document.getElementById('timeline').innerHTML += `
            <div class="card time-card ">
            <div class="cell border-right">
              <small>${month}</small>
              <h3>${day}</h3>
            </div>

            <div class="cell border-right text-active">
              <small>TIME-IN</small>
              <h3>${timelog.timein}</h3>
            </div>

            <div class="cell text-active">
              <small>TIME-OUT</small>
              <h3>${timelog.timeout}</h3>
            </div>
          </div>
            `
              break;
          }
        })
      } else {
        document.getElementById("timeline").innerHTML = "Nothing to show."
      }
    })
  document.getElementById('prevlogs').style.display = "block";
  hideManual();
}

const hideManual = () => {
  document.getElementById('manual').style.display = "none";
}

const showManual = () => {
  updateLeaveList();
  hideLogs();
  document.getElementById('manual').style.display = "block";
}

const setUsername = (name) => {
  document.getElementById('username').innerHTML = name;
  localStorage.name = name;
}

const logout = () => {
  localStorage.clear();
  window.location.href = "/login";
}

const updateLeaveList = () => {
  document.getElementById('leaves').innerHTML = "";
  client.get(`/getLeaves?id=${localStorage.user}`)
    .then(res => {
      if (res.data.status === "ok") {
        if (res.data.leaves.length === 0) {
          document.getElementById('leaves').innerHTML = '<tr><td>Nothing to show.</td><td></td><td></td></tr>'
        }
        let count = 1;
        res.data.leaves.reverse().forEach(leave => {
          let status = leave.status
          switch (status) {
            case "PENDING":
              document.getElementById('leaves').innerHTML += `

               <tr>
               <td>${count}</td>
               <td>${leave.date}</td>
               <td>
                <center>
                 <span class="btn btn-warning btn-sm">PENDING</span>
                 </center>
               </td>
             </tr>

               `
              break;

            case "DENIED":
              document.getElementById('leaves').innerHTML += `

               <tr>
               <td>${count}</td>
               <td>${leave.date}</td>
               <td>
                 <center>
                 <span class="btn btn-warning btn-sm">DENIED</span>
                 </center>
               </td>
             </tr>

               `
              break;

          }
          count++;
        })
      }
    })
}

const fileLeave = () => {
  swal.fire({
    html: `
      <div class="container rounded text-dark p-5 bg-light">
          <h3><i class="fa fa-edit"></i> File a Leave</h3>
          <hr>
        <p>Date range of Leave:</p>
        <input type="text" class="form-control" placeholder="Date Range" id="dr">
        <br>
        <p>Reason for Leave:</p>
        <textarea type="text" class="form-control text-dark" placeholder="Reason" id="lr" style="height:200px"></textarea>
      </div>
    `
  }).then(res => {
    let daterange = document.getElementById('dr').value;
    let reason = document.getElementById('lr').value;

    if (daterange && reason) {
      client.post("/fileLeave", {
        id: localStorage.user,
        name: localStorage.name,
        date: daterange,
        reason: reason,
      }).then(res => {
        if (res.data.status === "ok") {

          updateLeaveList();

          swal.fire({
            type: "success",
            showConfirmButton: false,
            title: "Success",
            text: `Your leave for ${daterange} was filed successfully!`,
            timer: 1500
          })
        }
      })
    } else {
      swal.fire({
        type: 'info',
        showConfirmButton: true,
        title: "Error",
        text: "You must complete the form procceed."
      })
    }

  })


}



class Time extends Component {
  state = {
    time: moment().format('hh:mm a'),
    userTimeIn: null,
    loading: false,
  }

  componentDidMount() {
    const { profileObj, setAppState } = this.props
    localStorage.user = profileObj.email;
    setUsername(profileObj.name);
    setProfileImg(profileObj);

    this.clockInterval(this.setTime)

    client.get('/appState', {
      params: {
        email: profileObj.email
      }
    })
      .then(response => {
        setAppState(response.data)
      })
  }


  componentWillUnmount() {
    if (this.clockInterval(this.setTime).clearInterval) {
      this.clockInterval(this.setTime).clearInterval()
    }
  }

  clockInterval = callback => {
    const interval = setInterval(callback, 60000)

    return interval
  }

  setTime = () => {
    this.setState({
      time: moment().format('hh:mm a')
    })
  }

  toggleLoading = () => {
    const { loading, } = this.state

    this.setState({
      loading: !loading
    })
  }

  userTimeIn = () => {
    const { profileObj, setAppState, appState } = this.props

    this.toggleLoading()

    if (appState.timeout === '-') {
      client.post('/timeout', {
        user: profileObj.email,
        timeout: moment().format('hh:mm a'),
        method: 'auto',
        date: moment().format('YYYY/MM/DD'),
      })
        .then(response => {
          const { timeData } = response.data

          this.toggleLoading()

          setAppState(timeData[0])
        })

      return
    }

    client.post('/timein', {
      user: profileObj.email,
      timein: moment().format('hh:mm a'),
      method: 'auto',
      date: moment().format('YYYY/MM/DD'),
    })
      .then(response => {
        const { timeData } = response.data

        this.toggleLoading()

        setAppState(timeData)
      })

  }

  render() {
    const { profileObj, appState } = this.props
    const { time, loading } = this.state

    if (!Object.keys(profileObj).length) {
      return <Redirect to="/login" />
    }

    return (
      <FlexLayout>
        <Layout>
          <Container>

            <div className="switch-btn left animated slideInLeft" onClick={() => { showManual() }}>
              <i className="fa fa-edit"></i>
            </div>

            <div className="switch-btn right animated slideInRight" onClick={() => { showLogs() }}>
              <i className="fa fa-bars"></i>
            </div>

            <div className="hidden-panel animated fadeInRight fastest timelogs" id="prevlogs">
              <h3>TIMELOGS</h3>
              <i className="fa fa-window-close fa-2x text-dark" id="close-logs" onClick={() => { hideLogs() }}></i>
              <small className="text-muted">Previous TimeLogs</small>
              <div id="timeline" className="mt-2">
              </div>
            </div>

            <div className="hidden-panel animated fadeInLeft fastest manual-time" id="manual">
              <h3>DASHBOARD</h3>
              <i className="fa fa-window-close fa-2x text-dark" id="close-logs" onClick={() => { hideManual() }}></i>
              <hr />
              <div className="card bg-light mb-2">
                <a>
                  <img src="https://i.ytimg.com/vi/91t5waPUNbs/maxresdefault.jpg" className="profile-img" id="profileimg"></img>
                  <span className="ml-2" id="username"></span>
                  <button className="btn btn-sm btn-dark float-right mt-2 mr-2" onClick={() => { logout() }}>Log out</button>
                </a>
              </div>

              <Tabs defaultActiveKey="leaves" id="uncontrolled-tab-example">
                <Tab eventKey="leaves" title="Leaves">
                  <center>
                    <button className="btn btn-dark mt-3" onClick={() => { fileLeave() }}>
                      <i className="fa fa-edit"></i> File a Leave
                    </button>
                    <hr />
                    <i class="fa fa-list"></i> Previous Leaves
                    <hr />
                  </center>
                  <div>

                    <Table striped bordered hover
                      className="small"
                    >
                      <thead>
                        <tr>
                          <th>No.</th>
                          <th>Date</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody id="leaves">
                      </tbody>
                    </Table>





                  </div>
                </Tab>
                <Tab eventKey="issues" title="Issues">

                  <center>
                    <p className="mt-5">You forgot to time out last:</p>
                    <h1>FRIDAY</h1>
                  </center>
                  <div className="mt-2">

                    <div className="card time-card">
                      <div className="cell border-right">
                        <small>AUG</small>
                        <h3>01</h3>
                      </div>

                      <div className="cell border-right">
                        <small>TIME-IN</small>
                        <h3>10:00 AM</h3>
                      </div>

                      <div className="cell">
                        <small>TIME-OUT</small>
                        <h3 className="text-danger">00:00</h3>
                      </div>
                    </div>

                    <hr></hr>

                    <div className="card timeout-card">
                      <span className="border-bottom py-2">TIME OUT</span>
                      <div className="p-3">
                        <input type="text" className="timeout-input" placeholder="00:00" />
                      </div>
                    </div>
                    <center>
                      <button className="btn btn-dark btn-lg mt-3">TIME OUT</button>
                    </center>


                  </div>

                </Tab>
              </Tabs>



            </div>

            <div id="line-slice">
              <div className="sl4">
                <div className="post lsc s2">
                  <div className="line"></div>
                </div>
              </div>
              <div className="sl5">
                <div className="post lsc s1">
                  <div className="line"></div>
                </div>
              </div>
              <div className="sl1">
                <div className="post lsc s5">
                  <div className="line"></div>
                </div>
              </div>
            </div>



            <TimeContainer
              onClick={this.userTimeIn}
              userTime={appState.status}
              isTimedIn={appState.timein !== '-' && appState.timeout === '-'}
              loading={loading}
              className="animated bounceIn"
              disabled={Object.keys(appState).length
                && appState.timein !== '-' && appState.timeout !== '-'
              }
            >
              <BackgroundHelper>
                <Eclipse loading={loading}>
                  <div />
                </Eclipse>
                <StyledTime>
                  {time.toUpperCase()}
                </StyledTime>
                <TimeDescription>
                  {
                    (appState.timeout === "-" && appState.timein !== "-")
                      ? "Tap to time out"
                      : (typeof appState.inToday === 'boolean' && !appState.inToday) ? "Done for today" : "Tap to time in" 
                  }
                </TimeDescription>
              </BackgroundHelper>
            </TimeContainer>
            <Footer>
              {
                appState.timeout === "-" && (
                  <p>
                    Estimated Time Out:
                    <span className="text-info ml-2">
                      {
                        moment(`${appState.date} ${appState.timein}`)
                          .add(9, 'hours')
                          .format('hh:mm a')
                          .toString()
                      }
                    </span>
                  </p>
                )
              }
            </Footer>
          </Container>
        </Layout>
      </FlexLayout>
    )
  }
}

export default Time