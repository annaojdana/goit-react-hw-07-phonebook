import styles from './ContactForm.module.css';
import { Button } from 'components/Button/Button';
import React from 'react';
import {
  useGetContactsQuery,
  useAddContactMutation,
} from 'services/contactsApi';

const ContactForm = () => {
  const { form, form__field, label, input } = styles;

  const { data: contacts = [] } = useGetContactsQuery();
  const [addContact, { isLoading }] = useAddContactMutation();

  const onSubmit = async e => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const number = form.number.value;

    if (contacts.some(contact => contact.name === name)) {
      alert(`${name} is already in contacts`);
      return;
    }

    if (contacts.some(contact => contact.phone === number)) {
      const [filteredNumber] = contacts.filter(
        contact => contact.phone === number
      );
      alert(`${number} is already in contact with ${filteredNumber.name} `);
      return;
    }

    try {
      await addContact({
        name,
        phone: number,
      });
    } catch (error) {
      alert(`Failed to save the contact`);
    }
    form.reset();
  };

  return (
    <form className={form} onSubmit={onSubmit}>
      <div className={form__field}>
        <label htmlFor="contactName" className={label}>
          Name
        </label>
        <input
          className={input}
          id="contactName"
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </div>
      <div className={form__field}>
        <label htmlFor="contactTel" className={label}>
          Phone number
        </label>
        <input
          className={input}
          id="contactTel"
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </div>
      <Button
        type="submit"
        title={isLoading ? 'Adding...' : 'Add contact'}
      ></Button>
    </form>
  );
};

export default ContactForm;
