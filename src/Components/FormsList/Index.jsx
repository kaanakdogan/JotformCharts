/* eslint-disable max-len */
import React, { useContext } from 'react';
import { HashRouter as Route, Link } from 'react-router-dom';
import PropType from 'prop-types';
import * as Styles from './Styles';
import { ModalContext } from '../../Contexts/ModalContext';
import { FormsContext } from '../../Contexts/FormsContext';

export default function List() {
  const [forms] = useContext(FormsContext);
  const [, setModal] = useContext(ModalContext);

  const handleClick = () => {
    console.log(process.env.PUBLIC_URL);
    setModal({ isOpen: false, modalName: 'formSelect' });
  };

  return (
    forms.map((f) => <Card key={f.id} name={f.title} desc={f.created_at} id={f.id} onClick={handleClick} />)
  );
}


function Card({
  id, onClick, name, desc,
}) {
  return (
    <Styles.Item to={`${id}`} onClick={onClick}>
      <Styles.ItemContent>
        <Styles.ItemTitle>{name}</Styles.ItemTitle>
        <Styles.ItemDesc>{desc}</Styles.ItemDesc>
      </Styles.ItemContent>
      <Styles.ItemLabels>

      </Styles.ItemLabels>
    </Styles.Item>
  );
}

Card.propTypes = {
  id: PropType.node.isRequired,
  onClick: PropType.func.isRequired,
  name: PropType.node.isRequired,
  desc: PropType.node.isRequired,
};
