import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const BASIC_URL = 'https://63396c6866857f698fb5d11c.mockapi.io/api/v1/contacts';

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


console.log(fetchContacts());
