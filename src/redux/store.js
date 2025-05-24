import { configureStore } from '@reduxjs/toolkit'
import pasteReducer from "./pasteSlice"
import requestReducer from "./contact_requests"

export const store = configureStore({
  reducer: {
    pastes : pasteReducer,
    contact_requests : requestReducer
  },
})