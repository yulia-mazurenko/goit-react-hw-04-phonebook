import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import FormError from './FormError';
import { FormStyle, Label, Button, Input } from './ContactForm.styled';

//----------with Formik-------------------------------------
const schema = yup.object().shape({
  name: yup.string().required('Please, enter correct name'),
  number: yup
    .number()
    .required('Please, check the correctness of phone number')
    .positive()
    .integer(),
});

const initialValues = {
  name: '',
  number: '',
};

export default function ContactForm({ onSubmitForm, onGetId }) {
  const contactId = onGetId();
  const contactNumberIid = onGetId();

  const handleFormSubmit = (values, { resetForm }) => {
    onSubmitForm(values);

    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleFormSubmit}
    >
      <FormStyle>
        <Label htmlFor={contactId}>
          Name
          <Input
            placeholder="John Snow"
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            id={contactId}
            required
          />
          <FormError name="name" />
          {/* <ErrorMessage component={Custom} name="email" /> */}
        </Label>
        <Label htmlFor={contactNumberIid}>
          Number
          <Input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            id={contactNumberIid}
            required
          />
          <FormError name="number" />
        </Label>
        <Button type="submit">Add contact</Button>
      </FormStyle>
    </Formik>
  );
}

ContactForm.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
};
