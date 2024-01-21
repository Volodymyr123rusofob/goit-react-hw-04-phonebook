import style from './listContacts.module.css';

const ListContacts = ({ items, deleteContact }) => {
  const elements = items.map(({ id, name, number }) => (
    <li key={id} className={style.list}>
      {name}: {number}
      <button
        className={style.btn}
        onClick={() => deleteContact(id)}
        type="button"
      >
        Delete
      </button>
    </li>
  ));
  return <ul className={style.ullist}>{elements}</ul>;
};

export default ListContacts;
