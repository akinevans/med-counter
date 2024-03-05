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
    //TODO create reducer for adding a new symptom entry object to SymptomsList array
    // first check if entry exists
    //if false, create new entry
    //else update existing entry

    addSymptomCard: (state, action) => {
      const { title, intensity, date, time, note, accentColor } =
        action.payload;

      const cardData = {
        title: title,
        intensity: intensity,
        date: date,
        time: time,
        note: note,
        accentColor: accentColor,
      };

      console.log(cardData);

      // add new data to symptomList state array
      state.symptomList.push(cardData);
      console.log(state.symptomList);
    },

    //TODO: create reducer for editing / updating an existing entry (one function that checks an objects key/values and updates each if necessary)

    deleteAll: (state) => {
      // reset symptomList array to empty
      state.symptomList = [];
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
export const {
  updateCount,
  resetCount,
  addSymptom,
  addSymptomCard,
  updateIntensity,
  deleteAll,
} = countSlice.actions;

export default countSlice.reducer;
