import React, { useContext } from 'react';
import { ThemeProvider } from 'styled-components';
import { Link } from 'react-router-dom';
import List from './FormsList/Index';
import CreateReport from './CreateReport/Index';
import { ModalView } from './Modal/Index';
import { ModalContext } from '../Contexts/ModalContext';
import Loading from './Loading';

const FullScreenTheme = {
  modalContainer: {
    width: '100%',
    height: '100%',
    borderRad: '0px',
    textAlign: 'center',
    padding: '32px',
    minWidth: '300px',
  },
  header: {
    paddingTop: '135px',
    fontSize: '2em',
  },
};

const CreateReportTheme = {
  modalContainer: {
    width: 'auto',
    height: 'auto',
    borderRad: '5px',
    textAlign: 'left',
    padding: '16px 32px',
    minWidth: '300px',
  },
  header: {
    paddingTop: '12px',
    fontSize: '21px',
  },
};

export default function ModalController() {
  const [modal, setModal] = useContext(ModalContext);

  const pickForm = (e) => {
    e.preventDefault();
    setModal({
      isOpen: true,
      modalName: 'formSelect',
      redirectUrl: '',
    });
  };

  const goBack = () => {
    setModal({
      isOpen: false,
      modalName: '',
      redirectUrl: '',
    });
  };

  if (modal.modalName === 'createReport') {
    return (
      <ThemeProvider theme={CreateReportTheme}>
        <ModalView header="Create A Report"><CreateReport /></ModalView>
      </ThemeProvider>
    );
  } if (modal.modalName === 'errorModal') {
    return (
      <ThemeProvider theme={CreateReportTheme}>
        <ModalView header="Report Not Found">
          <Link to={{ pathname: modal.redirectUrl }} onClick={goBack}>
           Go back ?
          </Link>

        </ModalView>
      </ThemeProvider>
    );
  } if (modal.modalName === 'unAuth') {
    return (
      <ThemeProvider theme={FullScreenTheme}>
        <ModalView header="Unauthorized Access" isNotClose><button type="button" onClick={pickForm}>Pick a Form ?</button></ModalView>
      </ThemeProvider>
    );
  } if (modal.modalName === 'loading') {
    return (
      <ThemeProvider theme={FullScreenTheme}>
        <ModalView header="Loading" isNotClose>
          <Loading />
        </ModalView>
      </ThemeProvider>
    );
  }
  return (
    <ThemeProvider theme={FullScreenTheme}>
      <ModalView header="Select A Form"><List /></ModalView>
    </ThemeProvider>
  );
}
