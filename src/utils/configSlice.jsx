import { createSlice } from "@reduxjs/toolkit";

const configtSlice = createSlice({
    name: "config",
    initialState: {
        lang: "en",
    },
    reducers: {
        changeLanguage : (state,action) => {
           state.lang = action.payload;
        }
    }
})
export const {changeLanguage} = configtSlice.actions;
export default configtSlice.reducer; 