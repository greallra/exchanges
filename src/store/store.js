import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '@/features/counter/counterSlice'
import loadingReducer from '@/features/loading/loadingSlice'
// import userReducer from '@/features/user/userSlice'
import languagesReducer from '@/features/languages/languagesSlice'

const store = configureStore({
  reducer: {
    counter: counterReducer,
    loading: loadingReducer,
    // user: userReducer,
    langauges: languagesReducer
  }
})
export default store