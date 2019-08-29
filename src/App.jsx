/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import PropType from 'prop-types';
import Header, { Help } from './Components/Header';
import { FormDataContext } from './Contexts/FormsContext';
import promisify from './Utils';
import ModalController from './Components/ModalController';
import { ModalContext } from './Contexts/ModalContext';
import History from './History';
import Tabs from './Components/Tabs/Index';
import { CleanDatabase, GetFormReports } from './DataStore';

function Page({ match }) {
  const [, setData] = React.useContext(FormDataContext);
  const [modal, setModal] = React.useContext(ModalContext);
  const [reports, setReports] = React.useState([]);

  React.useEffect(() => {
    const prom = promisify(global.JF.getFormQuestions);
    setModal(
      {
        isOpen: true,
        modalName: 'createReport',
      },
    );
    prom(match.params.id)
      .then(() => {
        setData(match.params.id);
      });
  }, [match]);

  React.useEffect(() => {
    const prom = GetFormReports(match.params.id);
    prom.then((reps) => {
      if (!reps) {
        setReports([]);
      } else {
        setReports(reps);
      }
    });
  }, [modal]);

  return (
    <div>
      <Header />
      <Tabs>
        {reports.map((rep) => (
          <div label={rep.name} key={rep.id} id={rep.id}>{rep.name} + {rep.id}</div>
        ))}
      </Tabs>
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
