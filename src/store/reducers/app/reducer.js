const initialState = {
  rules: {},
  events: [],
  appState: {},
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'APP/RULES':
      return {
        ...state,
        rules: action.payload.rulesObj
      }
    case 'APP/STATE':
      return {
        ...state,
        appState: action.payload.appStateObj
      }
    case 'APP/EVENTS':
      return {
        ...state,
        events: action.payload.eventsObj
      }
    default: {
      return state
    }
  }
}