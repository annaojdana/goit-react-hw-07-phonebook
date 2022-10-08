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
} from 'redux/slices/contactsSlice';

const ContactList = () => {
  const { wrapper, text, button } = styles;

  const dispatch = useDispatch();

  const contacts = useSelector(selectAllContacts);
  const contactsStatus = useSelector(getContactsStatus);
  const error = useSelector(getContactsError);
  const filter = useSelector(state => state.filter);
  const filteredContacts = contacts.filter(c =>
    c.name.toLowerCase().includes(filter)
  );

  useEffect(() => {
    if (contactsStatus === 'idle') {
      dispatch(fetchContacts());
    }
  }, [contactsStatus, dispatch]);
  
  console.log(contacts);

  let content;
  if (contactsStatus === 'loading') {
    content = <p>"Loading..."</p>;
  } else if (contactsStatus === 'succeeded') {
    console.log(contacts[1]);
    content = (
      <ul className={wrapper}>
        {filteredContacts.map(contact => {
          return (
            <li className={text} key={contact.id}>
              <span>{`${contact.name}: ${contact.number}`}</span>
              <button
                type="button"
                className={button}
                // onClick={() => deleteItemContact(contact.id)}
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



  console.log(contacts);
  // const deleteItemContact = id => {
  //   return dispatch(deleteContact(id));
  // };

  return (
    <>
      {filteredContacts.length > 0 ? (
        {content}
      ) : (
        <Notification message="You don't have this contact" />
      )}
    </>
  );
};

export default ContactList;
