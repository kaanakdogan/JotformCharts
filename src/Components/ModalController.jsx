import React, { useContext } from 'react';
import { ThemeProvider } from 'styled-components';
import List from './FormsList/Index';
import CreateReport from './CreateReport/Index';
import { ModalView } from './Modal/Index';
import { ModalContext } from '../Contexts/ModalContext';

const FullScreenTheme = {
  modalContainer: {
    width: '100%',
    height: '100%',
    borderRad: '0px',
    textAlign: 'center',
    padding: '32px',
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
  },
  header: {
    paddingTop: '12px',
    fontSize: '21px',
  },
};

export default function ModalController() {
  const [modal] = useContext(ModalContext);


  if (modal.modalName === 'createReport') {
    return (
      <ThemeProvider theme={CreateReportTheme}>
        <ModalView header="Create A Report"><CreateReport /></ModalView>
      </ThemeProvider>
    );
  }
  return (
    <ThemeProvider theme={FullScreenTheme}>
      <ModalView header="Select A Form"><List /></ModalView>
    </ThemeProvider>
  );
}
