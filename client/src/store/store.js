import { configureStore } from "@reduxjs/toolkit";
import monitorReducersEnhancer from "./config/enhancers/monitorReducers.js";
import rootReducer from "./reducer.js";
import logger from "./config/middleWare/logger.js";

export default function configureAppStore(preloadedState) {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    preloadedState,
    enhancers: (getDefaultEnhancers) =>
      getDefaultEnhancers().concat(monitorReducersEnhancer),
  });

  return store;
}
