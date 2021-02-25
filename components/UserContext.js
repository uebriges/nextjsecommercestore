import React, { useReducer } from 'react';

export const ACTIONS = {
  GET_USERNAME: 'get-username',
  LOGIN: 'login',
  LOGOUT: 'logout',
};

export const UserContext = React.createContext();

function userStateReducer(userState, action) {
  switch (action.type) {
    case ACTIONS.GET_USER:
      console.log('get username');
      return null;
      break;
    case ACTIONS.LOGIN:
      return {
        username: action.payload.username,
        isAdmin: action.payload.isAdmin,
        userId: action.payload.userId,
      };
    case ACTIONS.LOGOUT:
      return {
        username: null,
        isAdmin: null,
      };
    default:
      console.log('default');
      return null;
  }
}

export function UserContextProvider({ children }) {
  const [userState, dispatchUserState] = useReducer(userStateReducer, {});
  return (
    <UserContext.Provider value={{ userState, dispatchUserState }}>
      {children}
    </UserContext.Provider>
  );
}
