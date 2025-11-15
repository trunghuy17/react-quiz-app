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

export interface CandidateInfo {
  firstName: string;
  lastName: string;
  email: string;
  score: number;
}
export interface IAppState {
  form: {
    category:  string
    difficulty: string
    amount: number,
    type: string
  },
  score: number,
  candidates: CandidateInfo[]
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