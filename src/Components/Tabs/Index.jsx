import React, { useState, useContext } from 'react';
import * as Styles from './Styles';
import { ModalContext } from '../../Contexts/ModalContext';

function Tab({
  children, label, onClick, active,
}) {
  const handleClick = () => {
    onClick(label);
  };

  if (active === label) {
    return (
      <Styles.tabItemActive onClick={handleClick}>{label}</Styles.tabItemActive>
    );
  }

  return (
    <Styles.tabItem onClick={handleClick}>{label}</Styles.tabItem>
  );
}

export default function Tabs({ children }) {
  const [, setModal] = useContext(ModalContext);
  const [activeTab, setActiveTab] = useState();

  const newReportClick = () => {
    setModal({
      isOpen: true,
      modalName: 'createReport',
    });
  };

  const setActive = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <Styles.tabList>
        {children.map((child) => (
          <Tab
            key={child.props.id}
            label={child.props.label}
            onClick={setActive}
            active={activeTab}
          />
        ))}
        <Tab key="-1" label="New Report" onClick={newReportClick} />
      </Styles.tabList>
      <div>
        {children.map((child) => {
          if (child.props.label !== activeTab) return undefined;
          return child.props.children;
        })}
      </div>

    </div>
  );
}
