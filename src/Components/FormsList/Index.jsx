/* eslint-disable max-len */
import React, { useContext, useEffect } from 'react';
import PropType from 'prop-types';
import * as Styles from './Styles';
import promisify from '../../Utils';
import { ModalContext } from '../../Contexts/ModalContext';
import { FormsContext } from '../../Contexts/FormsContext';

export default function List() {
  const [forms, setForms] = useContext(FormsContext);
  const [modal, setModal] = useContext(ModalContext);

  useEffect(() => {
    const prom = promisify(global.JF.getForms);
    prom({ limit: 200 })
      .then((res) => {
        setForms(res); console.log(res);
      });
  }, [modal]);

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
    <Styles.Item href={`/#/${id}`} onClick={onClick}>
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
