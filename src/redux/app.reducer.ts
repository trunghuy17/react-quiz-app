import type { CandidateInfo, IAction } from "../types"

const initialState = {
  form: {
    category: '',
    difficulty: '',
    amount: 0,
    type: ''
  },
  score: 0,
  candidates: [] as CandidateInfo[]
}

export const appReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case 'SET_FORM': {
      return {
        ...state,
        form: action.payload
      }
    }
    case 'UPDATE_SCORE': {
      return {
        ...state,
        score: action.payload
      }
    }
    case "SET_CANDIDATE": {
      return {
        ...state,
        candidates: action.payload
      }
    }
    default:
      return state;
  }
}