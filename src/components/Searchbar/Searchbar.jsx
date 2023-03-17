import { useState } from 'react';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';
import { BsSearch } from 'react-icons/bs';
import {
  Button,
  ButtonLabel,
  Form,
  Input,
  SearchbarStyles,
} from './Searchbar.styled';

export default function Searchbar({ onSearch }) {
  const [value, setValue] = useState('');

  const handleInput = evt => {
    const inputValue = evt.currentTarget.value.toLowerCase();

    setValue(inputValue);
  };

  const handleSubmit = evt => {
    const word = value.trim();

    evt.preventDefault();

    if (word === '') {
      toast.error('Please, enter your search request');
      return;
    }

    onSearch(word);
    setValue('');
  };

  return (
    <SearchbarStyles>
      <Form onSubmit={handleSubmit}>
        <Button type="submit">
          <BsSearch size="24" />
        </Button>

        <Input
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={value}
          onChange={handleInput}
        />
      </Form>
    </SearchbarStyles>
  );
}

Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
