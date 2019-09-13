/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react';
import * as Styles from './Styles';
import { ModalContext } from '../../Contexts/ModalContext';

function Tab({
  label, onClick, active, id, form,
}) {
  const [dropview, setDropview] = useState(false);
  const eventRef = React.useRef(null);

  const handleClick = (e) => {
    if (id === '-1') e.preventDefault();
    onClick(id);
  };

  const handleDropview = () => {
    setDropview(true);
  };

  const handleClickOutside = () => {
    setDropview(false);
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => { document.removeEventListener('mousedown', handleClickOutside); };
  }, []);

  if (active == id) {
    return (
      <Styles.tabItemActive href={`#/${form}/${id}`} onClick={handleClick}>
        <a href={`#/${form}/${id}`} onClick={handleClick}>
          {label}
        </a>
        <span onClick={handleDropview}>
          {'  X'}
          {dropview ? <Dropview /> : null}
        </span>
      </Styles.tabItemActive>
    );
  }

  return (
    <Styles.tabItem><a href={`#/${form}/${id}`} onClick={handleClick}>{label}</a></Styles.tabItem>
  );
}

export default function Tabs({ children, active }) {
  const [, setModal] = useContext(ModalContext);
  const [activeTab, setActiveTab] = useState(active);


  const newReportClick = () => {
    setModal({
      isOpen: true,
      modalName: 'createReport',
    });
  };

  const setActive = (tab) => {
    setActiveTab(tab);
  };

  React.useEffect(() => { setActive(active); }, [active]);


  return (
    <div>
      <Styles.tabList>
        {children.map((child) => (
          <Tab
            key={child.props.id}
            label={child.props.label}
            onClick={setActive}
            active={activeTab}
            id={child.props.id}
            form={child.props.form}
          />
        ))}
        <Tab key="-1" id="-1" label="New Report" onClick={newReportClick} />
      </Styles.tabList>

    </div>
  );
}

function Dropview() {
  return (
    <Styles.DropviewWrapper>
      <Styles.DropviewContent>
        <div>Rename</div>
        <div>Delete</div>
        <div>Delete</div>
        <div>Delete</div>
        <div>Delete</div>
        <div>Delete</div>

      </Styles.DropviewContent>
    </Styles.DropviewWrapper>
  );
}
