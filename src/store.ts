import { combineReducers, createStore } from "redux";

import { appReducer } from "./redux/app.reducer";

const rootReducers = combineReducers({
  app: appReducer
})

export const store = createStore(rootReducers)