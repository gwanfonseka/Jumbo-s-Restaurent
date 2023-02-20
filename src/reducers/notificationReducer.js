import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'Notification',
    initialState: '',
    reducers: {
        triggerNotification(state, action) {
            return action.payload
        },
        clearNotification(state, action) {
            return action.payload
        }
    }
})

export const { triggerNotification, clearNotification } = notificationSlice.actions

export const setNotification = (content) => {
    return async dispatch => {
        await dispatch(triggerNotification(content.message))
        setTimeout(() => {
            return dispatch(clearNotification(''))
        }, content.timeout);
    }
}

export default notificationSlice.reducer