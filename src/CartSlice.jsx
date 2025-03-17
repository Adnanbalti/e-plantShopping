import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: { 
    items: [] },
  reducers: {
    addItem: (state, action) => {
//         console.log("Before Update - Cart State:", state.items); // 🔍 Debugging log

//   if (!Array.isArray(state.items)) {
//     console.error("❌ ERROR: state.items is not an array!", state.items);
//     return;
//   }

        // console.log("Action Payload:", action.payload); // Debugging log
        
        // Ensure we do not modify state directly
        const itemIndex = state.items.findIndex((item) => item.name === action.payload.name);
        if (itemIndex !== -1) {
            // Create a new array (immutability fix)
            state.items = state.items.map((item, index) =>
              index === itemIndex ? { ...item, quantity: item.quantity + 1 } : item
            );
          } else {
            state.items = [...state.items, { ...action.payload, quantity: 1 }];
          }

          
        // const { name, image, cost } = action.payload;
        // const existingItem = state.items.find(item => item.name === name);
        // if (existingItem) {
        //   existingItem.quantity++;
        // } else {
        //   state.items.push({ name, image, cost, quantity: 1 });
        // }
    },
    removeItem: (state, action) => {
        state.items = state.items.filter(item => item.name !== action.payload);
    },
    updateQuantity: (state, action) => {
        const { name, quantity } = action.payload;
const itemToUpdate = state.items.find(item => item.name === name);
if (itemToUpdate) {
  itemToUpdate.quantity = quantity;
}    
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
