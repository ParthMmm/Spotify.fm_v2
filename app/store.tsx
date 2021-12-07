import { configureStore, PayloadAction } from "@reduxjs/toolkit";
import { codeSlice } from "./codeSlice";
import { formSlice } from "./formSlice";
// ...

export const store = configureStore({
  reducer: {
    code: codeSlice.reducer,
    form: formSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
