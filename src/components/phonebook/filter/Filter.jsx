import style from './filter.module.css';

const FilterContact = ({ changeFilter }) => {
  return (
    <input
      className={style.inp}
      onChange={changeFilter}
      name="filter"
      placeholder="Search"
    />
  );
};

export default FilterContact;
