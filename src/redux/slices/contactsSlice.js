import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASIC_URL = 'https://63396c6866857f698fb5d11c.mockapi.io/api/v1/contacts';

const initialState = [];

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async () => {
    try {
      const response = await axios.get(BASIC_URL);
      console.log(response);
      return [...response];
    } catch (error) {
      return error.message;
    }
  }
);

export const addNewContact = createAsyncThunk(
  'contacts/addNewContact',
  async initialContact => {
    const response = await axios.post(BASIC_URL, initialContact);
    return response;
  }
);

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
