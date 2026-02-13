import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

type GetPizzasParams = {
  category: string;
  search: string;
  pagination: number;
  sort: {
    name: string;
    sortProperty: string;
  };
};

type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
};

interface PizzaState {
  items: Pizza[];
  status: Status;
}

const initialState: PizzaState = {
  items: [],
  status: Status.LOADING,
};

export const getPizzas = createAsyncThunk<Pizza[], GetPizzasParams>(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { category, search, pagination, sort } = params;
    const { data } = await axios.get<Pizza[]>(
      `https://696bdbd0624d7ddccaa236d2.mockapi.io/items?page=${pagination}&limit=4${category}&sortBy=${sort.sortProperty}${search}&order=desc`,
    );
    return data;
  },
);

export const pizzaSlice = createSlice({
  initialState,
  name: "pizza",
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPizzas.pending, (state) => {
        state.status = Status.LOADING;
        state.items = [];
      })
      .addCase(getPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = Status.SUCCESS;
      })
      .addCase(getPizzas.rejected, (state) => {
        state.status = Status.ERROR;
        state.items = [];
      });
  },
});

export const selectPizzaData = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
