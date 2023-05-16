import { ButtonDelete, ListContactText } from './ContactListItem.styled';
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';
import { deleteContact } from 'redux/contactsSlice';

export const ContactListItem = ({ contact }) => {
  const dispatch = useDispatch();
  return (
    <>
      <ListContactText>
        {contact.name}: {contact.number}
      </ListContactText>
      <ButtonDelete type="button" onClick={() => dispatch(deleteContact(contact.id))} >
        Delete
      </ButtonDelete>
    </>
  );
};

ContactListItem.propTypes = {
  contact: PropTypes.shape({
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
};