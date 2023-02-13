import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { Container } from './Container/Container';
import { Form } from './Form/Form';
import { ContactsList } from './ContactsList/ContactsList';
import { Filter } from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: JSON.parse(localStorage.getItem('contucts')) ?? [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      const stringifiedContacts = JSON.stringify(this.state.contacts);

      localStorage.setItem('contucts', stringifiedContacts);
    }
  }

  addContact = contact => {
    if (
      this.state.contacts.some(
        contactItem =>
          contactItem.name.toLowerCase() === contact.name.toLowerCase()
      )
    ) {
      alert(`Oops, ${contact.name} is already in contacts!`);
      return;
    }
    const finalContact = {
      id: nanoid(),
      ...contact,
    };

    this.setState({
      contacts: [...this.state.contacts, finalContact],
    });
  };

  handleFilter = ({ target: { value } }) => {
    this.setState({
      filter: value,
    });
  };

  handleDelete = event => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(el => el.id !== event.target.id),
    }));
  };

  render() {
    const filteredContacts = this.state.contacts.filter(contact =>
      contact.name
        .toLowerCase()
        .trim()
        .includes(this.state.filter.toLowerCase())
    );

    return (
      <Container>
        <h1>Phonebook</h1>
        <Form onSubmit={this.addContact} />
        <h2>Contacts</h2>
        <Filter value={this.state.filter} onFilterChange={this.handleFilter} />
        <ContactsList
          contacts={filteredContacts}
          onButtonDelete={this.handleDelete}
        />
      </Container>
    );
  }
}
