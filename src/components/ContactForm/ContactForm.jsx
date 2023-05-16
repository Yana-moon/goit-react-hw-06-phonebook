import { nanoid } from '@reduxjs/toolkit';
//import PropTypes from 'prop-types';
//import { Component } from 'react';
import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { addContacts } from 'redux/contactsSlice';
import { getContacts } from 'redux/selectors';

import { ButtonForm, Form, InputForm, LabelForm } from './ContactForm.styled';


  export const ContactForm = ({ onClickSubmit }) => {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const contacts = useSelector(getContacts);
    const dispatch = useDispatch();

    //Прибираємо this, ми позакласом, тому методів НЕМАЄ!, тому або function or const 

  const handleChange = evt => {
    const { name, value } = evt.target;
    //this.setState({ [name]: value });
    if (name === 'name') setName(value);
    else if (name === 'number') setNumber(value);
  };

  const addNewContact = () => {
    let newContact = {
      number,
      name,
      id: nanoid(),
    };

    const newContactName = contacts.find(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (newContactName) {
      return alert(`${newContact.name} is already in contacts.`);
    } else {
      dispatch(addContacts(newContact));
    }
  };

  const onFormSubmit = e => {
    e.preventDefault();
    addNewContact();
    setName('');
    setNumber('');
  };

    return (
      <Form onSubmit={onFormSubmit}>
        <LabelForm>
          Name
          <InputForm
            type="text"
            name="name"
            placeholder="Enter name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={handleChange}
            value={name}
          />
        </LabelForm>
        <LabelForm>
          Number
          <InputForm
            type="tel"
            name="number"
            placeholder="Enter number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={handleChange}
            value={number}
          />
        </LabelForm>
        <ButtonForm type="submit">Add contact</ButtonForm>
      </Form>
    );
  }


