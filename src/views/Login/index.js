import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { userAuthenticate } from '../../store/reducers/auth/actions'
import Login from './Login'

const mapStateToProps = state => {
  const { auth } = state
  const { profileObj } = auth

  return {
    profileObj,
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    userAuthenticate
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)