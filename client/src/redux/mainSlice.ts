import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MainState {
  accessToken: string;
  refreshToken: string;
  isLoading: boolean;
  error: string,
  nodeId: number | undefined,
  unread: boolean,
  fresh: boolean
}

const initialState: MainState = {
  accessToken: "",
  refreshToken: "",
  isLoading: false,
  error: "",
  nodeId: undefined,
  unread: false,
  fresh: false
};

export const mainSlice = createSlice({
  name: "mainSlice",
  initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<{
      accessToken: string,
      refreshToken: string
    }>) => {
      const { accessToken, refreshToken } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    },
    setNodeId: (state, action: PayloadAction<number>) => {
      state.nodeId = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    isLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setUnread: (state, action: PayloadAction<boolean>) => {
      state.unread = action.payload;
    },
    setFresh: (state, action: PayloadAction<boolean>) => {
      state.fresh = action.payload;
    }
  }
});

export const {
  setTokens
} = mainSlice.actions;

export default mainSlice.reducer;
