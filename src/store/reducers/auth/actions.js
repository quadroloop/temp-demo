export function userAuthenticate(profileObj) {
  return {
    type: 'USER/AUTH',
    payload: {
      profileObj
    }
  }
}