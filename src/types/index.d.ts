export interface ICategory {
  id: number,
  name: string
}

export interface IAction {
  type: string,
  payload: any
}

export interface IForm {
  category: string,
  difficulty: string,
  amount: number,
  type: string
}

export interface IAppState {
  form: {
    category:  string
    difficulty: string
    amount: number,
    type: string
  },
  score: number
}

export interface RootState {
  app: IAppState
}

export interface IQuestion {
  "type": string,
  "difficulty":string,
  "category": string,
  "question": string,
  "correct_answer": string,
  "incorrect_answers": string[]
}