import { Component } from 'react';
import { nanoid } from 'nanoid';
import style from './contactForm.module.css';

const INITIAL_STATE = {
  name: '',
  number: '',
};

class ContactForm extends Component {
  nameId = nanoid();
  numberId = nanoid();
  state = {
    ...INITIAL_STATE,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.setState({ ...INITIAL_STATE });
  };

  render() {
    const { nameId, numberId, handleSubmit, handleChange } = this;
    const { name, number } = this.state;

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
  }
}

export default ContactForm;

//! xyku

// import { useState } from 'react';
// import { nanoid } from 'nanoid';
// import style from './contactForm.module.css';

// const ContactForm = () => {
//   const [contact, setContact] = useState({
//     name: '',
//     number: '',
//   });

//   const { name, number } = contact;

//   const nameId = nanoid();
//   const numberId = nanoid();

//   const handleChange = ({ target }) => {
//     const { name, value } = target;
//     setContact({ [name]: value });
//   };

//   const handleSubmit = e => {
//     e.preventDefault();
//     this.props.onSubmit(contact);
//     setContact({ contact });
//   };

//   return (
//     <form onSubmit={handleSubmit} className={style.form} action="">
//       <label htmlFor={nameId}>Name</label>
//       <input
//         value={name}
//         onChange={handleChange}
//         id={nameId}
//         className={style.inp}
//         type="text"
//         name="name"
//         required
//       />
//       <label htmlFor={numberId}>Number</label>
//       <input
//         value={number}
//         onChange={handleChange}
//         id={numberId}
//         className={style.inp}
//         type="tel"
//         name="number"
//         required
//       />
//       <button className={style.btn} type="submit">
//         Add contact
//       </button>
//     </form>
//   );
// };

// export default ContactForm;
