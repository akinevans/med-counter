// Redux persist (in store.js) saves the state of the count so that when the page reloads the user will still have the latest count value

//TODO: rename this file and every occurrence of 'count'

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: [],
  symptomList: [],
  listOfUniqueKeys: [],
  intensityData: [],
};

export const countSlice = createSlice({
  name: "count",
  initialState,
  reducers: {
    // first check if entry exists
    //if false, create new entry
    //else update existing entry

    addSymptomCard: (state, action) => {
      const { uniqueKey, title, intensity, date, time, note, accentColor } =
        action.payload;

      // get this symptomCards index, then place it in cardData obj
      const cardIndex =
        state.symptomList.length === 0 ? 0 : state.symptomList.length;

      const cardData = {
        uniqueKey: uniqueKey,
        cardIndex: cardIndex,
        title: title,
        intensity: intensity,
        date: date,
        time: time,
        note: note,
        accentColor: accentColor,
      };

      const keyData = {
        uniqueKey: uniqueKey,
      };

      // Create new arrays with the updated data
      const newListOfUniqueKeys = [...state.listOfUniqueKeys, keyData];
      const newSymptomList = [...state.symptomList, cardData];

      console.log("unique Keys ", newListOfUniqueKeys);

      // Return a new state object with the updated arrays
      return {
        ...state,
        listOfUniqueKeys: newListOfUniqueKeys,
        symptomList: newSymptomList,
      };
    },

    //TODO: create reducer for editing / updating an existing entry (one function that checks an objects key/values and updates each if necessary)

    editSymptom: (state, action) => {
      const list = [...state.symptomList]; // Create a shallow copy of the array

      const {
        index,
        newTitle,
        newIntensity,
        newDate,
        newTime,
        newNote,
        newAccentColor,
      } = action.payload;

      //! i think the issue with data/ time is that those elements cant be updated like the others
      //! maybe they need a placeholder?

      //* date undefined here
      console.log("from edit reducer: date:", newDate);
      console.log("from edit reducer: time:", newTime);
      console.log("from edit reducer: title:", newTitle);
      console.log("from edit reducer: intensity:", newIntensity);
      console.log("from edit reducer: note:", newNote);
      console.log("from edit reducer: accent color:", newAccentColor);

      // Create a new object with the updated values
      const updatedSymptom = {
        ...list[index],
        date: newDate,
        time: newTime,
        title: newTitle,
        intensity: newIntensity,
        note: newNote,
        accentColor: newAccentColor,
      };
      console.log(updatedSymptom.date);
      alert("pause from reducer");

      // Update the copied array with the new object
      list[index] = updatedSymptom;

      // Return the updated state object
      return {
        ...state,
        symptomList: list,
      };
    },

    deleteSymptom: (state, action) => {
      //TODO delete from listOfuniqueKeys also
      //TODO delete from listOfuniqueKeys also
      //TODO delete from listOfuniqueKeys also

      const list = [...state.symptomList]; // Create a shallow copy of the array
      const indexToDelete = action.payload;

      // Use array filtering to create a new array without the object to delete
      const updatedList = list.filter((item, index) => index !== indexToDelete);

      // Return the updated state object
      return {
        ...state,
        symptomList: updatedList,
      };
    },

    deleteDuplicateSymptom: (state = initialState, action) => {
      //TODO delete from listOfUniqueKeys as well
      //TODO delete from listOfUniqueKeys as well
      const updatedSymptomListArray = [
        ...state.symptomList.slice(0, action.payload.index),
        ...state.symptomList.slice(action.payload.index),
      ];

      const updatedListOfUniqueKeys = [
        ...state.listOfUniqueKeys.slice(0, action.payload.index),
        ...state.listOfUniqueKeys.slice(action.payload.index),
      ];

      return {
        ...state,
        symptomList: updatedSymptomListArray,
        listOfUniqueKeys: updatedListOfUniqueKeys,
      };

      // handle other actions...
    },

    deleteAll: (state, action) => {
      const updatedSymptomListArray = [];
      const updatedListOfUniqueKeys = [];

      return {
        ...state,
        symptomList: updatedSymptomListArray,
        listOfUniqueKeys: updatedListOfUniqueKeys,
      };
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
  editSymptom,
  deleteDuplicateSymptom,
} = countSlice.actions;

export default countSlice.reducer;
