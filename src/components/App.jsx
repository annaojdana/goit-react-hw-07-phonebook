import styles from './App.module.css';
import Section from 'components/Section/Section';
import ContactForm from 'components/ContactForm/ContactForm';
import React from 'react';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

const App = () => {
  const { wrapper } = styles;

  return (
    <div className={wrapper}>
      <Section title="Phonebook">
        <ContactForm />
      </Section>
      <Section title="Contacts">
        <>
          <Filter />
          <ContactList />
        </>
      </Section>
    </div>
  );
};

export default App;
