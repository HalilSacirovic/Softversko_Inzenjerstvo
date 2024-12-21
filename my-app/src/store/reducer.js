import { combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";
import { productSlice } from "./productSlice";

export const rootReducer = combineReducers({
  auth: authSlice.reducer,
  product: productSlice.reducer,
  // test: testSlice.reducer,
});
