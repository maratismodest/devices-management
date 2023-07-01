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
        const status = action.payload.status;
        if (status && status === 403) {
          console.log("403", action);
          return alert("You do not have permit for the action!");
        }
        console.log("action", action);
        console.warn("We got a rejected with value action!");
        await alert(action.payload.data.detail || action.payload.data.errors.Comment[0] || action.payload.data.errors.Comment[0]);
      }

      return next(action);
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch

