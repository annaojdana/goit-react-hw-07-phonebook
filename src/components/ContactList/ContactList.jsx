import styles from './ContactList.module.css';
import { Notification } from 'components/Notification/Notification';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from 'redux/actions/contactsActions';

const ContactList = () => {
  const { wrapper, text, button } = styles;

  const contacts = useSelector(state => state.contacts);
  const filter = useSelector(state => state.filter);

  const filteredContacts = contacts.filter(c =>
    c.name.toLowerCase().includes(filter)
  );

  const dispatch = useDispatch();

  const deleteItemContact = id => {
    return dispatch(deleteContact(id));
  };

  return (
    <>
      {filteredContacts.length > 0 ? (
        <ul className={wrapper}>
          {filteredContacts.map(contact => {
            return (
              <li className={text} key={contact.id}>
                <span>{`${contact.name}: ${contact.number}`}</span>
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
      ) : (
        <Notification message="You don't have this contact" />
      )}
    </>
  );
};

export default ContactList;
