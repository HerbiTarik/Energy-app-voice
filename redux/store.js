import { configureStore } from "@reduxjs/toolkit";
import voiceReducer from "./voiceSlice";

const store = configureStore({
  reducer: {
    voice: voiceReducer,
  },
});

export default store;
