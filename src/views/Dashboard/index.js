import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { userAuthenticate } from '../../store/reducers/auth/actions'
import Dashboard from './Dashboard';
import { setRules, setEvents } from '../../store/reducers/app/actions';

const mapStateToProps = state => {
  const { auth, app } = state

  const { profileObj } = auth
  const { rules, events } = app

  return {
    profileObj,
    rules,
    events,
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    userAuthenticate,
    setRules,
    setEvents,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)