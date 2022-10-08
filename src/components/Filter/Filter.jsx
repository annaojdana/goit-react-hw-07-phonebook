import styles from './Filter.module.css';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setFilter } from 'redux/slices/filterSlice';


const Filter = () => {
  const { field, text, input } = styles;

  const dispatch = useDispatch();

  const filterValue = e => {
    const value = e.target.value.toLowerCase();
    dispatch(setFilter(value));
  };

  return (
    <div className={field}>
      <p className={text}>Find contact by name</p>
      <input className={input} type="text" onChange={filterValue} />
    </div>
  );
};

export default Filter;
