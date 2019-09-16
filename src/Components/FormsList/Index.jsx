/* eslint-disable max-len */
import React, { useContext } from 'react';
import PropType from 'prop-types';
import * as Styles from './Styles';
import { ModalContext } from '../../Contexts/ModalContext';
import { FormsContext } from '../../Contexts/FormsContext';

export default function List() {
  const [forms] = useContext(FormsContext);
  const [, setModal] = useContext(ModalContext);

  const handleClick = () => {
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
    <Styles.Item to={{ pathname: `/${id}`, hash: '#' }} onClick={onClick}>
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
