import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cart: [],
  // cart: [
  //   {
  //     pizzaId: 11,
  //     name: 'Spinach and Mushroom',
  //     quantity: 1,
  //     unitPrice: 15,
  //     totalPrice: 15,
  //   },
  // ],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      //payload = PizzaObject
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      //payload = pizzaID
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;
      if(item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getTotalPizzas = (store) =>
  store.cart.cart.reduce((total, item) => total + item.quantity, 0);

export const getTotalPrice = (store) =>
  store.cart.cart.reduce((total, item) => total + item.totalPrice, 0);

  export const getQuantityById = id => store => store.cart.cart.find(item => item.pizzaId === id)?.quantity ?? 0