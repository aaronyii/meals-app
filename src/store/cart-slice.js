import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: 'slice',
    initialState: {items: [], totalAmount: 0},
    reducers: {
        addItem(state, action) {
            const newItem = action.payload
            state.totalAmount += newItem.price * newItem.amount;
            const existingItem = state.items.find(item => item.id === newItem.id);
            if (existingItem) {
                existingItem.amount += newItem.amount
            }
            else {
                state.items.push(newItem)
            }
        },
        removeItem(state, action) {
            const existingItem = state.items.find(item => item.id === action.payload);
            state.totalAmount -= existingItem.price;
            if (existingItem.amount === 1)
            state.items = state.items.filter(item => item.id !== action.payload)
            else 
                existingItem.amount--;
        },
        clearCart(state) {
            state.items = [];
            state.totalAmount = 0;
        }
    }
})
export const cartActions = cartSlice.actions;
export default cartSlice.reducer


