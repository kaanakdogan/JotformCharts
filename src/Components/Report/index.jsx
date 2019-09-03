/* eslint-disable react/prop-types */
import React from 'react';
import { Route } from 'react-router-dom';
import { FormDataContext } from '../../Contexts/FormsContext';
import { ModalContext } from '../../Contexts/ModalContext';
import promisify from '../../Utils';
import { GetFormReports } from '../../DataStore';
import Header from '../Header';
import Tabs from '../Tabs';
import Layout from '../ResponsiveLayout';

export default function Report({ match }) {
  const [, setData] = React.useContext(FormDataContext);
  const [modal, setModal] = React.useContext(ModalContext);
  const [reports, setReports] = React.useState([]);

  React.useEffect(() => {
    const prom = promisify(global.JF.getFormQuestions);
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
        setModal({
          isOpen: true,
          modalName: 'createReport',
        });
      } else {
        setReports(reps);
      }
    });
  }, [modal, match]);


  return (
    <div>
      <Header />
      <Route
        exact
        path={`${match.url}/:rep`}
        render={(props) => (
          <ReportEditor reports={reports} form={match.params.id} match={props.match} />)}
      />
      <Route
        exact
        path={`${match.url}`}
        render={() => (
          <Tabs>
            {reports.map((rep) => (
              <div label={rep.name} key={rep.id} id={rep.id} form={match.params.id} />
            ))}
          </Tabs>
        )}
      />
      <Layout />
    </div>
  );
}

function ReportEditor({ reports, form, match }) {
  const [rep, setReps] = React.useState([]);
  const [modal, setModal] = React.useContext(ModalContext);

  React.useEffect(() => {
    console.log(match.params);
    const targetReps = reports.filter((r) => r.id == match.params.rep);
    setReps(targetReps);
  }, [match.params.rep]);

  React.useEffect(() => {
    if (rep && rep.length === 0) {
      setModal({
        isOpen: true,
        modalName: 'errorModal',
      });
      console.log(modal);
    } else {
      setModal({
        isOpen: false,
        modalName: 'errorModal',
      });
    }
  }, [rep]);


  return (
    <div>
      <Tabs active={match.params.rep}>
        {reports.map((r) => (
          <div label={r.name} key={r.id} id={r.id} form={form} />
        ))}
      </Tabs>
      { rep && rep.length !== 0 ? match.params.rep : <div /> }
    </div>
  );
}
