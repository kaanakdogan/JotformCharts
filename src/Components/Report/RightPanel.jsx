import React from 'react';
import * as Styles from './styles';
import Dropdown from '../Dropdown';

export default function RightPanel({ questions }) {
  const onSelect = (txt) => {
    console.log(txt);
  };

  return (
    <div style={{ width: '100%' }}>
      <p>Chart Options</p>
      {console.log(questions.map((q) => q.text)[0])}
      <Dropdown def={questions.map((q) => q.text)[0]} options={questions.map((q) => q.text)} onSelect={onSelect} />
    </div>
  );
}
