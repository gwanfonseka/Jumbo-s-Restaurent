import { createSlice } from "@reduxjs/toolkit";
import mealServices from '../services/meal';

const mealSlice = createSlice({
    name: 'meals',
    initialState: [],
    reducers: {
        setMeals(state, action) {
            return action.payload
        }
    }
})

export const { setMeals } = mealSlice.actions

export const initializeMeals = () => {
    return async dispatch => {
        const meals = await mealServices.getMeals()
        dispatch(setMeals(meals))
    }
}

export default mealSlice.reducer