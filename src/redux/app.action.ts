import type { IForm } from "../types"

export const setForm = (payload: IForm) => {
  return {
    type: 'SET_FORM',
    payload
  }
}

export const updateScore = (payload: number) => {
  return {
    type: 'UPDATE_SCORE',
    payload
  }
}