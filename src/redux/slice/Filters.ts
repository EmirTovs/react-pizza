import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type FilterSort = {
  name: string;
  sortProperty: "rating" | "price" | "title";
};

export interface FilterState {
  searchValue: string;
  categoryId: number;
  pagination: number;
  sort: FilterSort;
}

const initialState: FilterState = {
  searchValue: "",
  categoryId: 0,
  pagination: 1,
  sort: {
    name: "популярности",
    sortProperty: "rating",
  },
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    searchCategory: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    changeCategory: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload;
    },
    changeSort: (state, action: PayloadAction<FilterSort>) => {
      state.sort = action.payload;
    },
    currentPage: (state, action: PayloadAction<number>) => {
      state.pagination = action.payload;
    },
    setFilters: (state, action: PayloadAction<FilterState>) => {
      state.sort = action.payload.sort;
      state.categoryId = action.payload.categoryId;
      state.pagination = action.payload.pagination;
    },
    resetFilters: () => initialState,
  },
});

export const {
  searchCategory,
  changeCategory,
  changeSort,
  currentPage,
  setFilters,
  resetFilters,
} = categorySlice.actions;

export const selectCategory = (state: RootState) => state.category;

export const selectSort = (state: RootState) => state.category.sort;

export default categorySlice.reducer;
