import styles from './App.module.css';
import Section from 'components/Section/Section';
import ContactForm from 'components/ContactForm/ContactForm';
import React, { useEffect } from 'react';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { Notification } from './Notification/Notification';
import { useSelector, useDispatch } from 'react-redux';
import { fetchContacts, getContactsStatus } from 'redux/slices/contactsSlice';

const App = () => {
  const { wrapper } = styles;

  const dispatch = useDispatch();
  const contactsStatus = useSelector(getContactsStatus);
  const contactsList = useSelector(state => state.contacts.contacts);
  

  useEffect(() => {
    if (contactsStatus === 'idle') {
      dispatch(fetchContacts());
    }
  }, );

  return (
    <div className={wrapper}>
      <Section title="Phonebook">
        <ContactForm />
      </Section>
      <Section title="Contacts">
        {contactsList.length > 0 ? (
          <>
            <Filter />
            <ContactList />
          </>
        ) : (
          <Notification message="Your phonebook is empty" />
        )}
      </Section>
    </div>
  );
};

export default App;
