import { combineReducers, configureStore } from "@reduxjs/toolkit"
import userReducer from "../features/user/userSlice"

// Create the root reducer separately so we can extract the RootState type
const rootReducer = combineReducers({
  user: userReducer
})

export const setupStore = preloadedState => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}
