import { UserAction } from './actions';
import * as actionTypes from './actionTypes';

const getStateFromLocalStorage = (localStorageKey: string) => {
  let json = null;
  const value =localStorage.getItem(localStorageKey);
  if (value) {
    json = JSON.parse(value);
  }
  return json;
}

const saveStateToLocalStorage = (localStorageKey: string, value: any) => {
  localStorage.setItem(localStorageKey, JSON.stringify(value));
}

const clearStateFromLocalStorage = (localStorageKey: string) => {
  localStorage.removeItem(localStorageKey);
}


const initialState = {
  user: null, // Session info
}

const reducer = (state = initialState, action: UserAction) => {
  switch (action.type) {
    case actionTypes.USER_CONNECTED:
      return {
        ...state,
        user: action.user
      }
    case actionTypes.USER_UPDATED:
      return {
        ...state,
        user: action.user,
      }
  }
  return state;
}

export default reducer;

export { getStateFromLocalStorage, clearStateFromLocalStorage, saveStateToLocalStorage }; 