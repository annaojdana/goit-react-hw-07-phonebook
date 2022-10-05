import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASIC_URL = 'https://63396c6866857f698fb5d11c.mockapi.io/api/v1/contacts';


const initialState = [];

export const fetchContacts = createAsyncThunk('contacts/fetchContacts', async () => {
  try {
    const response = await axios.get(BASIC_URL);
    console.log(response);
    return [...response];
  }
  catch (error) {
    return error.message;
  }
})


const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {}
})




export const selectAllPosts = state => state.posts.posts;
export const getPostsStatus = state => state.posts.status;
export const getPostsError = state => state.posts.error;

export const { postAdded, reactionAdded } = postsSlice.actions;

export default contactsSlice.reducer;
