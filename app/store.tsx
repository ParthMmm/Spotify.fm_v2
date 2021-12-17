import { configureStore, PayloadAction, createStore } from "@reduxjs/toolkit";
import { codeSlice } from "./codeSlice";
import { formSlice } from "./formSlice";
import { pageSlice } from "./pageSlice";
// ...
// const store = createStore(counter)

export const store = configureStore({
  reducer: {
    code: codeSlice.reducer,
    form: formSlice.reducer,
    page: pageSlice.reducer,
  },
  preloadedState: {
    code: {
      code: "",
      token: "",
    },
    form: {
      form: {
        username: "",
        period: "",
        playlistName: "",
      },
    },
    page: {
      page: "landing",
    },
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
