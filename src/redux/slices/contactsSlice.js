import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASIC_URL = 'https://63396c6866857f698fb5d11c.mockapi.io/api/v1/contacts';

const initialState = {
  contacts: [],
  status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async () => {
    const response = await axios.get(BASIC_URL);
    console.log(response.data);
    return response.data;
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
    contactAdded: {
      reducer(state, action) {
        state.contacts.push(action.payload);
      },
      prepare(name, phone) {
        return {
          payload: {
            id: nanoid(),
            name,
            phone,
            createdAt: new Date().toISOString(),
          },
        };
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
        // Fix for API contact IDs:
        // Creating sortedcontacts & assigning the id
        // would be not be needed if the fake API
        // returned accurate new contact IDs
        action.payload.id = nanoid();
        // End fix for fake API contact IDs
        action.payload.createdAt = new Date().toISOString();
        console.log(action.payload);
        state.contacts.push(action.payload);
      });
  },
});

export const selectAllContacts = state => state.contacts.contacts;
export const getContactsStatus = state => state.contacts.status;
export const getContactsError = state => state.contacts.error;

export const { contactAdded } = contactsSlice.actions;

export default contactsSlice.reducer;
