/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import PropType from 'prop-types';
import Header, { Help } from './Components/Header';
import { FormDataContext } from './Contexts/FormsContext';
import promisify from './Utils';
import ModalController from './Components/ModalController';
import ModalProvider, { ModalContext } from './Contexts/ModalContext';
import History from './History';

function Page({ match }) {
  const [, setData] = React.useContext(FormDataContext);
  const [, setModal] = React.useContext(ModalContext);

  React.useEffect(() => {
    const prom = promisify(global.JF.getFormQuestions);
    setModal(
      {
        isOpen: true,
        modalName: 'createReport',
      },
    );
    prom(match.params.id)
      .then((res) => {
        setData(Object.values(res));
      });
  }, []);

  return (
    <div>
      <Header />
      <h1>Form Data: {match.params.id}</h1>
    </div>
  );
}

export default function App() {
  return (
    <Router history={History}>
      <Switch>
        <Route exact path="/" component={Page} />
        <Route path="/help" component={Help} />
        <Route path="/:id(\d+)" component={Page} />
      </Switch>
      <ModalController />
    </Router>
  );
}

Page.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  match: PropType.object.isRequired,
};
