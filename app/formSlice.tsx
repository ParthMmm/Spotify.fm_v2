import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

// Define a type for the slice state
interface FormState {
  form: { username: string; period: string; playlistName: string };
}

// Define the initial state using that type
const initialState: FormState = {
  form: { username: "", period: "", playlistName: "" },
};

export const formSlice = createSlice({
  name: "formSlice",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setForm: (state, { payload }: PayloadAction<FormState>) => {
      state.form = payload.form;
    },
  },
});

export const { setForm } = formSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectForm = (state: RootState) => state.form;

export default formSlice.reducer;
