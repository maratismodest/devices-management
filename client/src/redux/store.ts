import type { MiddlewareAPI } from "@reduxjs/toolkit";
import { combineReducers, configureStore, isRejectedWithValue } from "@reduxjs/toolkit";
import { gatewaysAPI } from "services/GatewaysService";
import { devicesAPI } from "services/DevicesService";

import mainReducer from "./mainSlice";

const rootReducer = combineReducers({
  mainSlice: mainReducer,
  [gatewaysAPI.reducerPath]: gatewaysAPI.reducer,
  [devicesAPI.reducerPath]: devicesAPI.reducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(gatewaysAPI.middleware)
    .concat(devicesAPI.middleware)
    .concat((api: MiddlewareAPI) => (next) => async (action) => {
      if (isRejectedWithValue(action)) {
        console.log("action", action);
        await alert(action.payload.data.message || action.payload.data.detail);
      }
      return next(action);
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch

