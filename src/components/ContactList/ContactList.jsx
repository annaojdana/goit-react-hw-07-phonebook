import styles from './ContactList.module.css';
import { Notification } from 'components/Notification/Notification';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import {
  selectAllContacts,
  getContactsError,
  getContactsStatus,
  fetchContacts,
  deleteContactById,
} from 'redux/slices/contactsSlice';
import { nanoid } from 'nanoid';

const ContactList = () => {
  const { wrapper, text, button } = styles;

  const dispatch = useDispatch();

  const contacts = useSelector(selectAllContacts);
  const contactsStatus = useSelector(getContactsStatus);
  const error = useSelector(getContactsError);
  const filter = useSelector(state => state.filter);
  const filteredContacts = contacts
    .filter(c => c.name.toLowerCase().includes(filter))
    .sort((a, b) => b.id - a.id);

  useEffect(() => {
    if (contactsStatus === 'idle') {
      dispatch(fetchContacts());
    }
  }, [contactsStatus, dispatch]);

  let content;
  if (contactsStatus === 'loading') {
    content = <p>"Loading..."</p>;
  } else if (contactsStatus === 'succeeded') {
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
                onClick={() => deleteItemContact(contact.id)}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    );
  } else if (contactsStatus === 'failed') {
    content = <p>{error}</p>;
  }

  const deleteItemContact = id => {
    return dispatch(deleteContactById(id));
  };

  return (
    <>
      {filteredContacts.length > 0 ? (
        content
      ) : (
        <Notification message="You don't have this contact" />
      )}
    </>
  );
};

export default ContactList;
