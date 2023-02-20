import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: 'search',
    initialState: '',
    reducers: {
        changeSearch(state, action) {
            const content = action.payload
            return content
        }
    }
})

export const { changeSearch } = searchSlice.actions

export default searchSlice.reducer