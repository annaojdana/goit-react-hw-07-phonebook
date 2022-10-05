import { configureStore } from '@reduxjs/toolkit';
import contactsSlice from './slices/contactsSlice';
import filterSlice from './slices/filterSlice';

const store = configureStore({
  reducer: {
    filter: filterSlice,
    contacts: contactsSlice,
  },
});

export default store;
