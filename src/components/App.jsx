import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from './phonebook/form/ContactForm';
import ListContacts from './phonebook/listContacts/ListContacts';
import FilterContact from './phonebook/filter/Filter';

import style from './app.module.css';

const App = () => {
  const [contacts, setContacts] = useState(() => {
    const contact = JSON.parse(localStorage.getItem('contact'));
    return contact || [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contact', JSON.stringify(contacts));
  }, [contacts]);

  const isDublicate = ({ name }) => {
    const normalizedName = name.toLowerCase();
    const dublicate = contacts.find(item => {
      const normalizedCurrentName = item.name.toLowerCase();
      return normalizedCurrentName === normalizedName;
    });
    return Boolean(dublicate);
  };

  const addContact = data => {
    if (isDublicate(data)) {
      return alert(`Contact ${data.name} already in list`);
    }
    setContacts(prevContacts => {
      const newContact = {
        id: nanoid(),
        ...data,
      };
      return [...prevContacts, newContact];
    });
  };

  const deleteContact = id => {
    setContacts(prevContacts => prevContacts.filter(item => item.id !== id));
  };

  const changeFilter = ({ target }) => {
    setFilter(target.value);
  };

  const getFilteredContact = () => {
    if (!filter) return contacts;
    const normalizedFilter = filter.toLowerCase();
    const filteredContact = contacts.filter(({ name }) => {
      const normalizedName = name.toLowerCase();
      return normalizedName.includes(normalizedFilter);
    });
    return filteredContact;
  };

  const items = getFilteredContact();

  return (
    <div className={style.box}>
      <div className={style.boxdiv}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={addContact} />
        <div className={style.div}>
          <h2 className={style.h2}>Contacts</h2>
          <FilterContact changeFilter={changeFilter} />
          <ListContacts items={items} deleteContact={deleteContact} />
        </div>
      </div>
    </div>
  );
};

export default App;
