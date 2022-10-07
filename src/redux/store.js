import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from './slices/contactsSlice';
import filterSlice from './slices/filterSlice';

const store = configureStore({
  reducer: {
    filter: filterSlice,
    contacts: contactsReducer,
  },
});

export default store;
