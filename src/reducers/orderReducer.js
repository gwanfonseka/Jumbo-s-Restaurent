import { createSlice } from "@reduxjs/toolkit";
import orderServices from "../services/order";
import { setNotification } from "./notificationReducer";

const generateId = () => {
    const randomId = (Math.random() * 500000).toFixed(0)
    return randomId
}

const formTheOrderObject = () => {
    const order = {
        orderId: '',
        dateTime: '',
        numberOfItems: 0,
        totalPrice: 0,
        items: []
    }

    return order
}

const orderSlice = createSlice({
    name: 'order',
    initialState: formTheOrderObject(),
    reducers: {
        createOrder(state, action) {
            return action.payload
        },
        cnacelOrder(state, action) {
            return action.payload
        },
        addItem(state, action) {
            return { ...state, items: state.items.concat(action.payload), numberOfItems: state.numberOfItems + action.payload.qty, totalPrice: state.totalPrice + action.payload.price }
        },
        updateItemQty(state, action) {
            const updatedItem = action.payload
            const itemList = state.items
            const updatedList = updatedItem.qty === 0 ? itemList.filter(item => item.itemId !== updatedItem.itemId) : itemList.map(item => item.itemId === updatedItem.itemId ? updatedItem : item)

            let qty = 0, total = 0
            for (let item of updatedList) {
                qty += item.qty
                total += item.price
            }
            return { ...state, items: updatedList, numberOfItems: qty, totalPrice: total }
        }
    }
})

export const { createOrder, addItem, updateItemQty, cnacelOrder } = orderSlice.actions

export const addOrderItem = (content) => {
    return async dispatch => {
        const newItem = { itemId: content.id, name: content.name, qty: 1, unitPrice: content.price, price: content.price }
        return await dispatch(addItem(newItem))
    }
}

export const changeQty = (content) => {
    return async dispatch => {
        const updatedItem = { itemId: content.itemId, name: content.name, qty: content.qty, unitPrice: content.unitPrice, price: content.qty * content.unitPrice }
        return await dispatch(updateItemQty(updatedItem))
    }
}

export const emptyOrder = () => {
    return async dispatch => {
        const initialObj = formTheOrderObject()
        return await dispatch(cnacelOrder(initialObj))
    }
}

export const newOrder = (content) => {
    return async dispatch => {
        const finalisedOrder = { ...content, orderId: generateId(), dateTime: new Date() }
        await orderServices.createOrder(finalisedOrder)
        const initialObj = formTheOrderObject()
        
        dispatch(setNotification({ message: 'Your order has been confirmed! Enjoy your meal.', timeout: 3000 }))
        return dispatch(createOrder(initialObj))
    }
}

export default orderSlice.reducer