import { configureStore } from "@reduxjs/toolkit";
import myReducer from "./reducers";

const Store = configureStore({
  reducer: myReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export default Store;
