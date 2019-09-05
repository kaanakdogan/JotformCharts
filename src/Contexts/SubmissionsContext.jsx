import React from 'react';
import PropTypes from 'prop-types';

export const SubmissionsContext = React.createContext();

export default function SubmissionsProvider({ children }) {
  const [submissions, setSubmissions] = React.useState([]);

  return (
    <SubmissionsContext.Provider value={[submissions, setSubmissions]}>
      { children }
    </SubmissionsContext.Provider>
  );
}

SubmissionsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
