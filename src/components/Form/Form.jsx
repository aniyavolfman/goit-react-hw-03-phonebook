import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Form.module.css'

export class Form extends Component {
  state = {
    name: '',
    number: '',
  };

  handleInputChange = event => {
    const inputValue = event.target.value;
    const inputName = event.target.name;
    this.setState({
      [inputName]: inputValue,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const contact = {
        name: this.state.name,
        number: this.state.number,
    };

    this.props.onSubmit(contact);

    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className={css.formContact}>
        <label>
          <div>Name</div>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleInputChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label>
          <div>Number</div>
          <input
            type="tel"
            name="number"
            value={this.state.number}
            onChange={this.handleInputChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>

        <button type="submit" className={css.buttonSubmit}>Add contact</button>
      </form>
    );
  }
}

  Form.propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };