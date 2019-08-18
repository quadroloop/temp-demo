export function setRules(rulesObj) {
  return {
    type: 'APP/RULES',
    payload: {
      rulesObj
    }
  }
}

export function setAppState(appStateObj) {
  return {
    type: 'APP/STATE',
    payload: {
      appStateObj: !appStateObj ? {} : appStateObj
    }
  }
}

export function setEvents(eventsObj) {
  return {
    type: 'APP/EVENTS',
    payload: {
      eventsObj
    }
  }
}