const { createSlice } = require('@reduxjs/toolkit');

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: [],
  reducers: {
    addContacts(state, action) {
      return [...state, action.payload];
    },

    deleteContact(state, action) {
      return state.filter(contact => contact.id !== action.payload);
    },
  },
});

export const { addContacts, deleteContact } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;