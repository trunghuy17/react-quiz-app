import type { IAction } from "../types"

const initialState = {
  users: null
}

/*
  users = [
    {
      id: xx,
      firstName: xx,
      lastName: xxx,
      score: xxx
    },
    {
      id: xx,
      firstName: xx,
      lastName: xxx,
      score: xxx
    }
    ....
  ]
*/


export const leaderboardReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case 'UPDATE_USER': {
      return {
        ...state,
        /// code ...
      }
    }
    default:
      return state;
  }
}