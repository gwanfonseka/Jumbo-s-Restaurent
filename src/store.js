import { configureStore } from "@reduxjs/toolkit";
import mealReducer from "./reducers/mealReducer";
import searchReducer from "./reducers/searchReducer";
import orderReducer from "./reducers/orderReducer";
import notificationReducer from "./reducers/notificationReducer";

const store = configureStore({
    reducer: {
        meals: mealReducer,
        search: searchReducer,
        order: orderReducer,
        notification: notificationReducer
    }
})

export default store