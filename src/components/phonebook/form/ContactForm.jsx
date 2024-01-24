import { useState } from 'react';
import { nanoid } from 'nanoid';
import style from './contactForm.module.css';

const ContactForm = ({ onSubmit }) => {
  const [contact, setContact] = useState({
    name: '',
    number: '',
  });

  const nameId = nanoid();
  const numberId = nanoid();

  const { name, number } = contact;

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setContact({ ...contact, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(contact);
    setContact({
      name: '',
      number: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className={style.form} action="">
      <label htmlFor={nameId}>Name</label>
      <input
        value={name}
        onChange={handleChange}
        id={nameId}
        className={style.inp}
        type="text"
        name="name"
        required
      />
      <label htmlFor={numberId}>Number</label>
      <input
        value={number}
        onChange={handleChange}
        id={numberId}
        className={style.inp}
        type="tel"
        name="number"
        required
      />
      <button className={style.btn} type="submit">
        Add contact
      </button>
    </form>
  );
};

export default ContactForm;
