/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react';
import * as Styles from './Styles';
import { ModalContext } from '../../Contexts/ModalContext';
import bread from '../../bread.svg';

const Dropview = React.forwardRef((props, ref) => (
  <Styles.DropviewWrapper ref={ref}>
    <Styles.DropviewContent>
      <button onClick={props.startEdit}>Rename</button>
      <button onClick={props.deleteReport}>Delete</button>
      <div>Delete</div>
      <div>Delete</div>
      <div>Delete</div>
      <div>Delete</div>

    </Styles.DropviewContent>
  </Styles.DropviewWrapper>
));


function Tab({
  label, onClick, active, id, form, editName, deleteReport,
}) {
  const [dropview, setDropview] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const eventRef = React.useRef(null);
  const labelRef = React.useRef(null);

  React.useEffect(() => {
    if (labelRef.current) {
      labelRef.current.innerText = label;
    }
  }, [label, active]);

  React.useEffect(() => {
    if (isEditing) {
      labelRef.current.focus();
      setDropview(false);
    }
  }, [isEditing]);

  const handleClick = (e) => {
    if (id === '-1') e.preventDefault();
    onClick(id);
  };

  const handleDropview = () => {
    setDropview(true);
  };

  const handleClickOutside = (e) => {
    if (eventRef.current && !eventRef.current.contains(e.target)) {
      setDropview(false);
    }
  };

  const handleClickOutsideEdit = (e) => {
    if (labelRef.current && !labelRef.current.contains(e.target)) {
      setIsEditing(false);

      editName(labelRef.current.innerText);
      document.removeEventListener('mousedown', handleClickOutsideEdit);
    }
  };

  const stopEditing = (e) => {
    if (e && e.code === 'Enter') {
      setIsEditing(false);

      editName(labelRef.current.innerText);
      document.removeEventListener('keydown', stopEditing);
    }
  };

  const startEditing = (e) => {
    e.preventDefault();
    setIsEditing(true);

    document.addEventListener('keydown', stopEditing);
    document.addEventListener('mousedown', handleClickOutsideEdit);
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (active == id) {
    return (
      <Styles.tabItemActive onClick={handleClick}>
        <a href={`#/${form}/${id}`} onClick={handleClick}>
          <Styles.EditableWrapper>
            <Styles.p ref={labelRef} contentEditable={isEditing} />
          </Styles.EditableWrapper>
        </a>
        <Styles.dropToggle onClick={handleDropview}>
          <Styles.Img src={bread} />
          {dropview ? <Dropview ref={eventRef} startEdit={startEditing} close={setDropview} deleteReport={deleteReport} /> : null}
        </Styles.dropToggle>
      </Styles.tabItemActive>
    );
  }

  return (
    <Styles.tabItem><a href={`#/${form}/${id}`} onClick={handleClick}>{label}</a></Styles.tabItem>
  );
}

export default function Tabs({
  children, active, editName, deleteReport,
}) {
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

  const editReportName = (name) => {
    editName(name, activeTab);
  };

  const delReport = (e) => {
    e.preventDefault();
    console.log(activeTab);
    deleteReport(activeTab);
  };

  React.useEffect(() => { setActive(active); }, [active]);


  return (

    <Styles.tabList>
      <Styles.tabsWrapper>
        {children.map((child) => (
          <Tab
            label={child.props.label}
            onClick={setActive}
            active={activeTab}
            key={child.props.id}
            id={child.props.id}
            form={child.props.form}
            editName={editReportName}
            deleteReport={delReport}
          />
        ))}
        <Tab key="-1" id="-1" label="New Report" onClick={newReportClick} />
      </Styles.tabsWrapper>
    </Styles.tabList>
  );
}
