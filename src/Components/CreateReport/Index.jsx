/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import * as Styles from './Styles';
import { AddReport } from '../../DataStore';
import { FormDataContext } from '../../Contexts/FormsContext';
import { ModalContext } from '../../Contexts/ModalContext';

export default function CreateReport() {
  const [txt, setName] = useState('');
  const [formData] = React.useContext(FormDataContext);
  const [, setModal] = React.useContext(ModalContext);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    AddReport(formData.id, {
      name: txt,
      charts: [],
    }).then(() => {
      setModal({
        isOpen: false,
        modalName: 'createReport',
      });
    });
  };

  return (
    <div>
      <Styles.Content>
        <Styles.Title>Report Name</Styles.Title>
        <Styles.NameInput
          type="text"
          name="name"
          placeholder="New Report"
          autoComplete="off"
          onChange={(e) => setName(e.target.value)}
          value={txt}
          required
        />
      </Styles.Content>
      <Styles.Footer>
        <Styles.Button type="submit" onClick={handleSubmit}>Submit </Styles.Button>
      </Styles.Footer>
    </div>
  );
}
