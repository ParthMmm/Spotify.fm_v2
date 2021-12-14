import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

// Define a type for the slice state
interface PageState {
  page: string;
}

// Define the initial state using that type
const initialState: PageState = {
  page: "landing",
};

export const pageSlice = createSlice({
  name: "pageSlice",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setPage: (state, action: PayloadAction<string>) => {
      state.page = action.payload;
    },
  },
});

export const { setPage } = pageSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectPage = (state: RootState) => state.page;

export default pageSlice.reducer;
