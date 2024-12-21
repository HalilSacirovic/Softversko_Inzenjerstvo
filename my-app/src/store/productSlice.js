import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorites: [],
  report: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {
    setFavorite(state, actions) {
      const product = actions.payload;
      const favorites_id = state.favorites.map((item) => item._id);
      if (!favorites_id.includes(product._id)) {
        state.favorites.push(product);
      }
      return state;
    },
    setReport(state, actions) {
      const reports = actions.payload;
      state.report.push(reports);
      return state;
    },

    clearFavorites(state, actions) {
      return initialState;
    },
  },
});
