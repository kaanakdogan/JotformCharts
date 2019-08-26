import React from 'react';
import PropType from 'prop-types';

export const FormsContext = React.createContext();

export default function FormsProvider({ children }) {
  const [forms, setForms] = React.useState([]);

  return (
    <FormsContext.Provider value={[forms, setForms]}>
      {children}
    </FormsContext.Provider>
  );
}

export const FormDataContext = React.createContext();

export function FormDataProvider({ children }) {
  const [form, setForm] = React.useState({});

  return (
    <FormDataContext.Provider value={[form, setForm]}>
      {children}
    </FormDataContext.Provider>
  );
}

FormDataProvider.propTypes = {
  children: PropType.node.isRequired,
};

FormsProvider.propTypes = {
  children: PropType.node.isRequired,
};
