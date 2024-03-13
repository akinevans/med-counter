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
    addSymptomCard: (state, action) => {
      const { uniqueKey, date, time, title, intensity, note, accentColor } =
        action.payload;

      // Cannot manipulate redux state arrays directly
      // Create new arr's by spreading existing state arr's into new arr's
      const newListOfUniqueKeys = [...state.listOfUniqueKeys, uniqueKey];
      const newSymptomList = [
        ...state.symptomList,
        {
          uniqueKey,
          title,
          intensity,
          date,
          time,
          note,
          accentColor,
        },
      ];

      // Return a new state object with the updated arrays
      return {
        ...state,
        listOfUniqueKeys: newListOfUniqueKeys,
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
      // console.log("from edit reducer: accent color:", accentColor);

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
      alert("pause from reducer");

      // Update the copied array with the new object
      list[index] = updatedSymptom;

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
      const { indexToDelete, uniqueKeyToDelete, indexOfUniqueKey } =
        action.payload;

      // Create a shallow copy of the symptom and uniqueKey arrays
      let listOfSymptoms = [...state.symptomList];
      let listOfUniqueKeys = [...state.listOfUniqueKeys];

      // const symptomData = {
      //   ...listOfSymptoms[indexToDelete],
      //   deletionIndex: indexToDelete,
      // };

      console.log(
        "index to delete:",
        indexToDelete,
        "uniqueKey index to delete:",
        indexOfUniqueKey
      );

      alert("pause for deleteSymptom");

      // Use splice to remove the element from the copied array
      listOfSymptoms.splice(indexToDelete, 1);

      //^ To fix bug where uniqueKey arr is being edited incorrectly.
      // erase the whole arr then loop over listOfSymptoms, while accessing the unique key property of each and pushing the values into new listOfKeys
      // this is O(n) operation

      listOfUniqueKeys.splice(indexOfUniqueKey, 1);

      // for (let i = 0; i < listOfUniqueKeys.length; i++) {
      //   if (listOfUniqueKeys[i].uniqueKey === uniqueKeyToDelete) {
      //     // remove from array
      //     listOfUniqueKeys.splice(i, 1);
      //   }
      // }

      console.log("INDEX", indexOfUniqueKey);
      console.log("new symptom arr:", listOfSymptoms);
      console.log("new uniq arr:", listOfUniqueKeys);
      alert("pause for deleteSymptomCard");

      // Return the updated state object with the modified arrays
      return {
        ...state,
        symptomList: listOfSymptoms,
        listOfUniqueKeys: listOfUniqueKeys,
      };
    },

    //
    //
    //
    //

    deleteDuplicateSymptom: (state = initialState, action) => {
      const { index, uniqueKeyIndex } = action.payload;

      const updatedSymptomListArray = [
        ...state.symptomList.slice(0, index),
        ...state.symptomList.slice(index),
      ];

      const updatedListOfUniqueKeys = [
        ...state.listOfUniqueKeys.slice(0, uniqueKeyIndex),
        ...state.listOfUniqueKeys.slice(uniqueKeyIndex),
      ];

      console.log(
        "symptom arr near end of delete duplicate",
        updatedSymptomListArray
      );
      console.log(
        "unique arr near end of delete duplicate",
        updatedListOfUniqueKeys
      );
      alert("pause for deleteDuplicate");

      // unsure why but removing the return statement ensures duplicates are deleted
      // return {
      //   ...state,
      //   symptomList: updatedSymptomListArray,
      //   listOfUniqueKeys: updatedListOfUniqueKeys,
      // };
    },

    //
    //
    //
    //

    deleteAll: (state, action) => {
      const updatedSymptomListArray = [];
      const updatedListOfUniqueKeys = [];

      return {
        ...state,
        symptomList: updatedSymptomListArray,
        listOfUniqueKeys: updatedListOfUniqueKeys,
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
