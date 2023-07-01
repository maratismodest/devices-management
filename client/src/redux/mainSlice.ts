import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MainState {
  isLoading: boolean;
  error: string,
}

const initialState: MainState = {
  error: "",
  isLoading: false
};

export const mainSlice = createSlice({
  name: "mainSlice",
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    isLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    }
  }
});

export const {} = mainSlice.actions;

export default mainSlice.reducer;
