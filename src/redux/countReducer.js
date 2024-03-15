//TODO: rename this file and every occurrence of 'count'

// FIXME: Duplicate cards fail to be deleted under unknown conditions

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
    addSymptomCard: (state, action) => {
      const { date, time, title, intensity, note, accentColor } =
        action.payload;

      // Cannot manipulate redux state arrays directly
      // Create new arr's by spreading existing state arr's into new arr's
      const newSymptomList = [
        ...state.symptomList,
        {
          date,
          time,
          title,
          intensity,
          note,
          accentColor,
        },
      ];

      // Sort the newSymptomList array by date and time
      newSymptomList.sort((a, b) => {
        const dateA = new Date(`${a.date} ${a.time}`);
        const dateB = new Date(`${b.date} ${b.time}`);
        return dateA - dateB;
      });

      // Return a new state object with the updated arrays
      return {
        ...state,
        symptomList: newSymptomList,
      };
    },

    //
    //
    //
    //

    editSymptom: (state, action) => {
      // Create a shallow copy of the array
      const list = [...state.symptomList];

      const { index, date, time, title, intensity, note, accentColor } =
        action.payload;

      // console.log("from edit reducer: date:", date);
      // console.log("from edit reducer: time:", time);
      // console.log("from edit reducer: title:", title);
      // console.log("from edit reducer: intensity:", intensity);
      // console.log("from edit reducer: note:", note);
      console.log("from edit reducer: accent color:", accentColor);

      // Create a new object with the updated values
      const updatedSymptom = {
        ...list[index],
        index: index,
        date: date,
        time: time,
        title: title,
        intensity: intensity,
        note: note,
        accentColor: accentColor,
      };

      console.log(updatedSymptom);

      // Update the copied array with the new object
      list[index] = updatedSymptom;

      // Sort the list array by date and time
      list.sort((a, b) => {
        const dateA = new Date(`${a.date} ${a.time}`);
        const dateB = new Date(`${b.date} ${b.time}`);
        return dateA - dateB;
      });

      return {
        ...state,
        symptomList: list,
      };
    },

    //
    //
    //
    //

    deleteSymptomCard: (state, action) => {
      const { indexToDelete } = action.payload;

      // Create a shallow copy of the symptom state array
      let listOfSymptoms = [...state.symptomList];

      console.log("index to delete:", indexToDelete);

      alert("pause for deleteSymptom");

      // Use splice to remove the element from the copied array
      listOfSymptoms.splice(indexToDelete, 1);

      console.log("new symptom arr:", listOfSymptoms);
      alert("pause for deleteSymptomCard");

      // Return the updated state object with the modified arrays
      return {
        ...state,
        symptomList: listOfSymptoms,
      };
    },

    //
    //
    //
    //

    deleteDuplicateSymptom: (state = initialState, action) => {
      const { index } = action.payload;

      const updatedSymptomListArray = [
        ...state.symptomList.slice(0, index),
        ...state.symptomList.slice(index),
      ];

      console.log(
        "symptom arr near end of delete duplicate",
        updatedSymptomListArray
      );

      alert("pause for deleteDuplicate");

      //! unsure why, but removing the return statement ensures duplicates are deleted

      // return {
      //   ...state,
      //   symptomList: updatedSymptomListArray,
      // };
    },

    //
    //
    //
    //

    deleteAll: (state, action) => {
      const updatedSymptomListArray = [];

      return {
        ...state,
        symptomList: updatedSymptomListArray,
      };
    },
  },
});

export const {
  addSymptomCard,
  deleteAll,
  editSymptom,
  deleteSymptomCard,
  deleteDuplicateSymptom,
} = countSlice.actions;

export default countSlice.reducer;
