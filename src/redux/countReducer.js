// Redux persist (in store.js) saves the state of the count so that when the page reloads the user will still have the latest count value

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: [],
  symptomList: [],
  intensityData: [],
};

export const countSlice = createSlice({
  name: "count",
  initialState,
  reducers: {
    updateCount: (state, action) => {
      // let { count } = state;
      const { newCount } = action.payload;
      // const minCount = 0;

      state.count = newCount;

      //   console.log(count);
      console.log(newCount);
    },

    resetCount: (state, action) => {
      const { clear } = action.payload;
      // let { count } = state;

      //   state.count = [];
      //   alert("in resetCount");

      state.count = clear;
    },

    addSymptom: (state, action) => {
      const { data } = action.payload;
      state.symptomList.push(data);
    },

    updateIntensity: (state, action) => {
      const { data } = action.payload;
      state.intensityData.push(data);
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateCount, resetCount, addSymptom, updateIntensity } =
  countSlice.actions;

export default countSlice.reducer;
