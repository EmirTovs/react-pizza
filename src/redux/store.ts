import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./slice/Filters";
import cartSlice from "./slice/Cart";
import pizzaSlice from "./slice/PizzaSlice";

export const store = configureStore({
  reducer: {
    category: categorySlice,
    cart: cartSlice,
    pizza: pizzaSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
