import { createSlice } from '@reduxjs/toolkit'
import store from '@/store/store.js'
import { esGetCollection } from 'exchanges-shared'
import { db as FIREBASE_DB} from '@/firebaseConfig'

export const languagesSlice = createSlice({
    name: 'languages',
    initialState: {
      value: [],
    },
    reducers: {
      setLanguages: (state, { payload }) => {
        state.value = payload;
      },
    },
})



async function getLanguages() {
    const { data } = await esGetCollection(FIREBASE_DB, 'languages')
     
    store.dispatch(setLanguages(data))
}
getLanguages();
// Action creators are generated for each case reducer function
export const { setLanguages } = languagesSlice.actions

export default languagesSlice.reducer