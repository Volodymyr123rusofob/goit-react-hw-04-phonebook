import { Component } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from './phonebook/form/ContactForm';
import ListContacts from './phonebook/listContacts/ListContacts';
import FilterContact from './phonebook/filter/Filter';

import style from './app.module.css';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contact'));
    if (contacts?.length) {
      this.setState({
        contacts,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;

    if (prevState.contacts.length === contacts.length) {
      return;
    }

    localStorage.setItem('contact', JSON.stringify(contacts));
  }

  isDublicate({ name }) {
    const { contacts } = this.state;
    const normalizedName = name.toLowerCase();

    const dublicate = contacts.find(item => {
      const normalizedCurrentName = item.name.toLowerCase();
      return normalizedCurrentName === normalizedName;
    });
    return Boolean(dublicate);
  }

  addContact = data => {
    if (this.isDublicate(data)) {
      return alert(`Contact ${data.name} already in list`);
    }
    this.setState(({ contacts }) => {
      const newContact = {
        id: nanoid(),
        ...data,
      };
      return { contacts: [...contacts, newContact] };
    });
  };

  deleteContact = id => {
    this.setState(({ contacts }) => {
      const newContact = contacts.filter(item => item.id !== id);

      return {
        contacts: newContact,
      };
    });
  };

  changeFilter = ({ target }) => {
    this.setState({ filter: target.value });
  };

  getFilteredContact() {
    const { filter, contacts } = this.state;
    if (!filter) {
      return contacts;
    }

    const normalizedFilter = filter.toLowerCase();

    const filteredContact = contacts.filter(({ name }) => {
      const normalizedName = name.toLowerCase();
      return normalizedName.includes(normalizedFilter);
    });
    return filteredContact;
  }

  render() {
    const { addContact, deleteContact, changeFilter } = this;
    const name = this.getFilteredContact();

    return (
      <div className={style.box}>
        <div className={style.boxdiv}>
          <h1>Phonebook</h1>
          <ContactForm onSubmit={addContact} />
          <div className={style.div}>
            <h2 className={style.h2}>Contacts</h2>
            <FilterContact changeFilter={changeFilter} />
            <ListContacts items={name} deleteContact={deleteContact} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
