import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const CONTACTS_URL =
  'https://63396c6866857f698fb5d11c.mockapi.io/api/v1/contacts';

const initialState = {
  contacts: [],
  status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async () => {
    const response = await axios.get(CONTACTS_URL);
    return response.data;
  }
);

export const addNewContact = createAsyncThunk(
  'contacts/addNewContact',
  async initialContact => {
    const response = await axios.post(CONTACTS_URL, initialContact);
    return response;
  }
);
export const deleteContactById = createAsyncThunk(
  'contacts/deleteContact',
  async id => {
    const response = await axios.delete(CONTACTS_URL, id);
    return response;
  }
);

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    contactAdded: {
      reducer(state, action) {
        state.contacts.push(action.payload);
      },
      prepare(name, phone) {
        return {
          payload: {
            name,
            phone,
            createdAt: new Date().toISOString(),
          },
        };
      },
    },
    contactDelete: {
      reducer(state, action) {
        state.contacts = state.contacts.filter(c => c.id !== action.payload);
      },
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchContacts.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Add any fetched contacts to the array
        state.contacts = [...action.payload];
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addNewContact.fulfilled, (state, action) => {
        state.status = 'idle';
        console.log(action.payload.data);
        // state.contacts = [...action.payload.data];
      })
      .addCase(deleteContactById.fulfilled, (state, action) => {
        state.status = 'idle';
        console.log(action.payload);
      });
  },
});

export const selectAllContacts = state => state.contacts.contacts;
export const getContactsStatus = state => state.contacts.status;
export const getContactsError = state => state.contacts.error;

export const { contactAdded } = contactsSlice.actions;

export default contactsSlice.reducer;
