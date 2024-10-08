import { configureStore } from "@reduxjs/toolkit";
import { placeListReducer } from "../service/reducer";

export const store = configureStore({
  reducer: { place: placeListReducer },
});
