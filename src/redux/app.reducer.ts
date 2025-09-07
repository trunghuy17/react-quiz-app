import type { IAction } from "../types"

const initialState = {
  form: {
    category: '',
    difficulty: '',
    amount: 0,
    type: ''
  }
}

export const appReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case 'SET_FORM': {
      return {
        ...state,
        form: action.payload
      }
    }
    default:
      return state;
  }
}