import { nanoid } from 'nanoid';

//import { Component } from 'react';
import { useEffect, useState } from 'react';

import { Wrapper } from './App.styled';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

//export class App extends Component {
  //state = {
    //contacts: [],
    //filter: '',
  //};

  export const App = () => {
    const [contacts, setContacts] = useState(() => {
      return JSON.parse(localStorage.getItem('contacts')) ?? [];
    });
    const [filter, setFilter] = useState('');

  //componentDidMount() {
    //const getStorageContacts = localStorage.getItem('contacts');
    //const storageContacts = JSON.parse(getStorageContacts);
    //if (storageContacts)
     // this.setState({
       // contacts: storageContacts,
     // });
  //}

  //componentDidUpdate(prevState) {
    //if (prevState.contacts !== this.state.contacts) {
     //const saveContacts = JSON.stringify(this.state.contacts);
     // localStorage.setItem('contacts', saveContacts);
    //}
  //}

  useEffect(() => {
    const saveContacts = JSON.stringify(contacts);
    localStorage.setItem('contacts', saveContacts);
  }, [contacts]);

  //Прибираємо this, ми позакласом, тому методів НЕМАЄ!, тому або function or const
  

  const addContact = (name, number) => {
    const contactNew = {
      id: nanoid(),
      name,
      number,   
    };

    //let updatedContacts;
    //addContact = newContact => {
      //const { contacts } =this.state;
    const newContactName = contacts.find(
      contact => contact.name.toLowerCase() === contactNew.name.toLowerCase()  
    );

if  (newContactName) {
    alert(`This name is already in contacts.`);
    return;
} else {
  setContacts(prev => [...prev, contactNew]);
}
};
    //}

  const changeFilter = e => {
    const { value } = e.target;
    setFilter(value);
  };

  const searchName = () => {
    const lowerCase = filter.toLowerCase();
    return contacts.filter(contact => 
      contact.name.toLowerCase().includes(lowerCase)
      );
    };

  // Delete contact

  const deleteContact = id => {
      setContacts ( prev => prev.filter(contact => contact.id !== id));
  };

    return (
      <Wrapper>
        <h1>Phonebook</h1>
        <ContactForm onClickSubmit={addContact}/>
        <h2>Contacts</h2>
        <Filter onChangeFilter={changeFilter} valueFilter={filter}/>
        {contacts.length > 0 && (
        <ContactList onClickDelete={deleteContact} contacts={searchName()}/>
        )}
      </Wrapper>
    );
        };