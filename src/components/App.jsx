import styles from './App.module.css';
import Section from 'components/Section/Section';
import ContactForm from 'components/ContactForm/ContactForm';
import React from 'react';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { Notification } from './Notification/Notification';
import { useSelector } from 'react-redux';

const App = () => {
  const { wrapper } = styles;

  const contactsList = useSelector(state => state.contacts);
 

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
