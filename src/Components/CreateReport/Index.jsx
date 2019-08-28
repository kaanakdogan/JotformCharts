/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import * as Styles from './Styles';

export default function CreateReport() {
  const [name, setName] = useState('');

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(`${name} Submit`);
  };

  return (
    <div>
      <Styles.Content>
        <Styles.Title>Report Name</Styles.Title>
        <Styles.NameInput
          type="text"
          name="name"
          placeholder="New Report"
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
        />
      </Styles.Content>
      <Styles.Footer>
        <Styles.Button type="submit" onClick={handleSubmit}>Submit </Styles.Button>
      </Styles.Footer>
    </div>
  );
}
