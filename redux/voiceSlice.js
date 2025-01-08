import { createSlice } from "@reduxjs/toolkit";

const voiceSlice = createSlice({
  name: "voice",
  initialState: {
    voice: null,
  },
  reducers: {
    setVoice: (state, action) => {
      const { voice } = action.payload;
      state.voice = voice;
    },
    clearVoice: (state) => {
      state.voice = null;
    },
  },
});

export const { setVoice, clearVoice } = voiceSlice.actions;
export default voiceSlice.reducer;
