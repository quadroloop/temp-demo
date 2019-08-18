import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Time from './Time'
import { setAppState } from '../../store/reducers/app/actions'

const mapStateToProps = state => {
  const { auth, app } = state
  const { profileObj } = auth
  const { appState } = app

  return {
    profileObj,
    appState
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    setAppState
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Time)