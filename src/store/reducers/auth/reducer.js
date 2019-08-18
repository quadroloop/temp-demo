let initialState = {
  profileObj: {}
}

let storageAuth = localStorage.getItem('profileObj')

if (storageAuth) {
  let parsedStorageAuth = JSON.parse(storageAuth)

  initialState = {
    ...initialState,
    profileObj: {
      ...parsedStorageAuth
    }
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'USER/AUTH':
      localStorage.setItem('profileObj', JSON.stringify(action.payload.profileObj))

      return {
        ...state,
        profileObj: action.payload.profileObj
      }
    default: 
      return state
  }
}