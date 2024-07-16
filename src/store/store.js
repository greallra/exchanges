import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import loadingReducer from '../features/loading/loadingSlice'

const store = configureStore({
  reducer: {
    counter: counterReducer,
    loading: loadingReducer,
  }
})
export default store