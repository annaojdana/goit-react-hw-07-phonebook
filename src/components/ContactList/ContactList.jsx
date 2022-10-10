import styles from './ContactList.module.css';
import { Notification } from 'components/Notification/Notification';
import React from 'react';
import { useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import Loader from 'components/Loader/Loader';
import {
  useGetContactsQuery,
  useDeleteContactMutation,
} from 'services/contactsApi';

const ContactList = () => {
  const { wrapper, text, button } = styles;

  const {
    data: contacts = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetContactsQuery();

  const filter = useSelector(state => state.filter);
  const [deleteItemContact] = useDeleteContactMutation();

  const filteredContacts = contacts.filter(c =>
    c.name.toLowerCase().includes(filter)
  );

  let content = <Notification message="Your phonebook is empty" />;

  if (isLoading) {
    content = <Loader />;
  } else if (isSuccess) {
    content = (
      <ul className={wrapper}>
        {filteredContacts.map(contact => {
          return (
            <li className={text} key={nanoid()}>
              <span>
                {`${contact.name}:
               ${contact.phone}`}
              </span>
              <button
                type="button"
                className={button}
                onClick={() => deleteItemContact({ id: contact.id })}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    );
  } else if (isError) {
    content = <Notification message={error} />;
  }

  return <>{content}</>;
};

export default ContactList;
