/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import * as Styles from './Styles';
import { AddReport } from '../../DataStore';
import { FormDataContext } from '../../Contexts/FormsContext';
import { ModalContext } from '../../Contexts/ModalContext';

export default function Email({ children }) {
  const [adress, setAdress] = useState('');
  const [topic, setTopic] = useState('');
  const [text, setText] = useState('');
  const [modal, setModal] = React.useContext(ModalContext);
  const mailRef = React.useRef();

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (!adress || adress.length === 0 || /^\s*$/.test(adress)) {
      mailRef.current.focus();
      return;
    }

    if (modal.callback) {
      modal.callback();
    }
    setModal({
      isOpen: false,
      modalName: 'createReport',
    });
  };

  return (
    <div>
      <Styles.Content>
        <Styles.NameInput
          ref={mailRef}
          type="text"
          name="name"
          placeholder="E-mail Adress"
          autoComplete="off"
          onChange={(e) => setAdress(e.target.value)}
          value={adress}
          required
        />
        <Styles.NameInput
          type="text"
          name="name"
          placeholder="Topic"
          autoComplete="off"
          onChange={(e) => setTopic(e.target.value)}
          value={topic}
          required
        />
        <Styles.TextArea
          rows="20"
          type="textarea"
          name="name"
          placeholder=""
          autoComplete="off"
          onChange={(e) => setText(e.target.value)}
          value={text}
          required
        />
      </Styles.Content>

      <Styles.Footer>
        {children}
        <Styles.Button type="submit" onClick={handleSubmit}>Submit </Styles.Button>
      </Styles.Footer>
    </div>
  );
}
