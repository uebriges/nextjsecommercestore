import React, { useReducer } from 'react';

export const ACTIONS = {
  GET_USER_BY_TOKEN: 'get-username',
  LOGIN: 'login',
  LOGOUT: 'logout',
};

export const UserContext = React.createContext();

function userStateReducer(userState, action) {
  switch (action.type) {
    case ACTIONS.GET_USER_BY_TOKEN:
      let state;
      console.log('token: ', action.payload.token);
      // Look for token
      fetch('/api/users/getUserByToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: action.payload.token,
        }),
      }).then((result) => {
        console.log('result: ', result);
        state = result;
      });
      // console.log('result in dispatch: ', result);

      return state;
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
