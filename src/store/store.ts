import { configureStore } from "@reduxjs/toolkit";
import formSlice from "./reducers/FormSlice/FormSlice";
import quizSlice from "./reducers/QuizSlice/QuizSlice";

const store = configureStore({
  reducer: {
    formReducer: formSlice,
    quizReducer: quizSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
