/* eslint-disable max-len */
import React, { useContext, useEffect } from 'react';
import PropType from 'prop-types';
import * as Styles from './Styles';
import promisify from '../../Utils';
import { ModalContext } from '../../Contexts/ModalContext';
import { FormsContext } from '../../Contexts/FormsContext';

export default function List() {
  const [forms, setForms] = useContext(FormsContext);
  const [isOpen, setIsOpen] = useContext(ModalContext);

  useEffect(() => {
    const prom = promisify(global.JF.getForms);
    prom({ limit: 200 })
      .then((res) => setForms(res));
  }, []);

  const handleClick = () => {
    console.log(`beforeset : ${isOpen}`);
    setIsOpen(false);
    console.log(`afterset : ${isOpen}`);
  };

  return (
    forms.map((f) => <Card key={f.id} name={f.title} desc={f.created_at} id={f.id} onClick={handleClick} />)
  );
}


function Card({
  id, onClick, name, desc,
}) {
  return (
    <Styles.FormListItem href={`/#/${id}`} onClick={onClick}>
      <Styles.ItemContent>
        <Styles.ItemTitle>{name}</Styles.ItemTitle>
        <Styles.ItemDesc>{desc}</Styles.ItemDesc>
      </Styles.ItemContent>
      <Styles.ItemLabels>

      </Styles.ItemLabels>
    </Styles.FormListItem>
  );
}

Card.propTypes = {
  id: PropType.node.isRequired,
  onClick: PropType.func.isRequired,
  name: PropType.node.isRequired,
  desc: PropType.node.isRequired,
};
