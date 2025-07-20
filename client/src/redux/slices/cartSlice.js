// import { createSlice } from "@reduxjs/toolkit";

// const cartSlice = createSlice({
//     name: "cart",

//     initialState:{
//         cartItems: [],
//         totalQuantity: 0,
//         totalPrice: 0,
//     },

//     reducers: {
//         addToCart: (state, action)=>{
//             const newItem = action.payload;
//             const existingItemIndex = state.cartItems.findIndex(
//                 (item)=> item._id === newItem._id
//             );
//             if(existingItemIndex === -1){
//                 state.cartItems.push({
//                     ...newItem,
//                     quantity: newItem.quantity,
//                     totalItemPrice: newItem.quantity * newItem.price,
//                 });
//             } else {
//                 state.cartItems[existingItemIndex].quantity += newItem.quantity;
//                 state.cartItems[existingItemIndex].totalItemPrice += newItem.price * newItem.quantity;
//             }

//             state.totalQuantity += newItem.quantity;
//             state.totalPrice = Number(
//                 (state.totalPrice + newItem.price * newItem.quantity).toFixed(2)
//             );
//         },

//         removeFromCart: (state, action)=>{
//             const itemToRemove = action.payload;
//             const existingItemIndex = state.cartItems.findIndex(
//                 (item)=> item._id === itemToRemove._id
//             );

//             if(existingItemIndex === -1) return;

//             const existingItem = state.cartItems[existingItemIndex];
//             existingItem.quantity -= itemToRemove.quantity;
//             existingItem.totalItemPrice -= itemToRemove.price * itemToRemove.quantity;

//             state.totalQuantity -= itemToRemove.quantity;
//             state.totalPrice = Number(
//                 (state.totalPrice - itemToRemove.price * itemToRemove.quantity).toFixed(2)
//             );

//             if(existingItem.quantity <= 0){
//                 state.cartItems = state.cartItems.splice(existingItemIndex, 1);
//             }
//         },

//         emptyCart: (state)=> {
//             state.cartItems = [];
//             state.totalQuantity = 0;
//             state.totalPrice = 0;
//         }
//     },
// });

// export const {addToCart, removeFromCart, emptyCart} = cartSlice.actions;
// export default cartSlice.reducer;














// // ---------BY GPT NEW----------------------------
// import { createSlice } from "@reduxjs/toolkit";

// const cartSlice = createSlice({
//     name: "cart",

//     initialState: {
//         cartItems: [],
//         totalQuantity: 0,
//         totalPrice: 0,
//     },

//     reducers: {
//         addToCart: (state, action) => {
//             const newItem = action.payload;
//             const existingItemIndex = state.cartItems.findIndex(
//                 (item) => item._id === newItem._id
//             );

//             if (existingItemIndex === -1) {
//                 state.cartItems.push({
//                     ...newItem,
//                     quantity: newItem.quantity,
//                     totalItemPrice: newItem.quantity * newItem.price,
//                 });
//             } else {
//                 state.cartItems[existingItemIndex].quantity += newItem.quantity;
//                 state.cartItems[existingItemIndex].totalItemPrice += newItem.price * newItem.quantity;
//             }

//             state.totalQuantity += newItem.quantity;
//             state.totalPrice = Number(
//                 (state.totalPrice + newItem.price * newItem.quantity).toFixed(2)
//             );
//         },

//         removeFromCart: (state, action) => {
//             const itemToRemove = action.payload;
//             const existingItemIndex = state.cartItems.findIndex(
//                 (item) => item._id === itemToRemove._id
//             );

//             if (existingItemIndex === -1) return;

//             const existingItem = state.cartItems[existingItemIndex];

//             // Reduce quantity and total price
//             existingItem.quantity -= itemToRemove.quantity;
//             existingItem.totalItemPrice -= itemToRemove.price * itemToRemove.quantity;

//             state.totalQuantity -= itemToRemove.quantity;
//             state.totalPrice = Number(
//                 (state.totalPrice - itemToRemove.price * itemToRemove.quantity).toFixed(2)
//             );

//             // Remove item completely if quantity is 0 or less
//             if (existingItem.quantity <= 0) {
//                 state.cartItems = state.cartItems.filter(
//                     (item) => item._id !== itemToRemove._id
//                 );
//             }
//         },

//         emptyCart: (state) => {
//             state.cartItems = [];
//             state.totalQuantity = 0;
//             state.totalPrice = 0;
//         },
//     },
// });

// export const { addToCart, removeFromCart, emptyCart } = cartSlice.actions;
// export default cartSlice.reducer;
























// //--------BY GPT OLD----------------


// import { createSlice } from "@reduxjs/toolkit";

// const cartSlice = createSlice({
//     name: "cart",
//     initialState: {
//         cartItems: [],
//         totalQuantity: 0,  // ✅ Fixed naming
//         totalPrice: 0,     // ✅ Fixed naming
//     },

//     reducers: {
        
//         addToCart: (state, action) => {
//             const newItem = action.payload;
            
//             // Ensure quantity is at least 1 if undefined
//             const itemQuantity = newItem.quantity ?? 1;
        
//             const existingItemIndex = state.cartItems.findIndex(
//                 (item) => item._id === newItem._id
//             );
        
//             if (existingItemIndex === -1) {
//                 state.cartItems.push({
//                     ...newItem,
//                     quantity: itemQuantity,  // ✅ Default to 1 if undefined
//                     totalItemPrice: itemQuantity * newItem.price,
//                 });
//             } else {
//                 state.cartItems[existingItemIndex].quantity += itemQuantity;
//                 state.cartItems[existingItemIndex].totalItemPrice += itemQuantity * newItem.price;
//             }
        
//             state.totalQuantity += itemQuantity;  // ✅ Prevent NaN
//             state.totalPrice = Number(
//                 (state.totalPrice + newItem.price * itemQuantity).toFixed(2)
//             );
//         },
        
//         removeFromCart: (state, action) => {
//             const itemToRemove = action.payload;
//             const existingItemIndex = state.cartItems.findIndex(
//                 (item) => item._id === itemToRemove._id  // ✅ Fixed _index issue
//             );

//             if (existingItemIndex === -1) return;

//             const existingItem = state.cartItems[existingItemIndex];
//             existingItem.quantity -= itemToRemove.quantity;
//             existingItem.totalItemPrice -= itemToRemove.quantity * itemToRemove.price;

//             state.totalQuantity -= itemToRemove.quantity;
//             state.totalPrice = Number(
//                 (state.totalPrice - itemToRemove.price * itemToRemove.quantity).toFixed(2)
//             );

//             if (existingItem.quantity <= 0) {
//                 state.cartItems = state.cartItems.filter((item) => item._id !== itemToRemove._id);  // ✅ Fixed
//             }
//         },

//         emptyCart: (state) => {
//             state.cartItems = [];
//             state.totalQuantity = 0;
//             state.totalPrice = 0;
//         }
//     },
// });

// export const { addToCart, removeFromCart, emptyCart } = cartSlice.actions;
// export default cartSlice.reducer;




















import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: [],
        totalQuantity: 0,
        totalPrice: 0,
    },

    reducers: {
        addToCart: (state, action) => {
            const newItem = action.payload;
            const itemQuantity = newItem.quantity ?? 1;  // ✅ Default to 1 if undefined

            const existingItemIndex = state.cartItems.findIndex(
                (item) => item._id === newItem._id
            );

            if (existingItemIndex === -1) {
                state.cartItems.push({
                    ...newItem,
                    quantity: itemQuantity,  // ✅ Fix: Corrected variable name
                    totalItemPrice: itemQuantity * newItem.price,
                });
            } else {
                state.cartItems[existingItemIndex].quantity += itemQuantity;
                state.cartItems[existingItemIndex].totalItemPrice += itemQuantity * newItem.price;
            }

            state.totalQuantity += itemQuantity;  // ✅ Fix: Correctly updating total quantity
            state.totalPrice = Number(
                (state.totalPrice + newItem.price * itemQuantity).toFixed(2)
            );
        },

        removeFromCart: (state, action) => {
            const itemToRemove = action.payload;
            const existingItemIndex = state.cartItems.findIndex(
                (item) => item._id === itemToRemove._id
            );

            if (existingItemIndex === -1) return;

            const existingItem = state.cartItems[existingItemIndex];

            existingItem.quantity -= itemToRemove.quantity;
            existingItem.totalItemPrice -= itemToRemove.quantity * itemToRemove.price;

            state.totalQuantity -= itemToRemove.quantity;
            state.totalPrice = Number(
                (state.totalPrice - itemToRemove.price * itemToRemove.quantity).toFixed(2)
            );

            if (existingItem.quantity <= 0) {
                state.cartItems.splice(existingItemIndex, 1);  // ✅ Fix: Use splice instead of filter
            }
        },

        emptyCart: (state) => {
            state.cartItems = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
        },
    },
});

export const { addToCart, removeFromCart, emptyCart } = cartSlice.actions;
export default cartSlice.reducer;
