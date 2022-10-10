import { configureStore } from '@reduxjs/toolkit';
import { contactsApi } from 'services/contactsApi';
import filterReducer from './slices/filterSlice';

const store = configureStore({
  reducer: {
    filter: filterReducer,
    [contactsApi.reducerPath]: contactsApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
