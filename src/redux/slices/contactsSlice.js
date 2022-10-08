import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { fetchContacts } from 'services/phonebookApi';


const initialState = [];




const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
  },
  extraReducers(builder) {
    builder.addCase(fetchContacts.fulfilled, (state, { payload }) => {
      state.contacts.push(payload);
    });
  },
});



export const getAllContacts = state => state.contacts;
export const getContactsStatus = state => state.status;
export const getContactsError = state => state.error;

export const { contactAdded, reactionAdded } = contactsSlice.actions;

export default contactsSlice.reducer;
