import { configureStore } from "@reduxjs/toolkit";
import myReducer from "./reducers";

const Store = configureStore({ reducer: myReducer });
export default Store;
