/* eslint-disable react/prop-types */
import React from 'react';
import { Route } from 'react-router-dom';
import { FormDataContext } from '../../Contexts/FormsContext';
import { ModalContext } from '../../Contexts/ModalContext';
import promisify from '../../Utils';
import { GetFormReports, EditReport } from '../../DataStore';
import Header from '../Header';
import Tabs from '../Tabs';
import { SubmissionsContext } from '../../Contexts/SubmissionsContext';
import ReportEditor from './ReportEditor';

async function GetSubmissions(formId) {
  const submissions = await promisify(global.JF.getFormSubmissions)(formId, { limit: 10000 });
  return submissions;
}

export default function Reports({ match }) {
  const [, setData] = React.useContext(FormDataContext);
  const [, setSubmissions] = React.useContext(SubmissionsContext);
  const [modal, setModal] = React.useContext(ModalContext);
  const [reports, setReports] = React.useState([]);

  React.useEffect(() => {
    const prom = promisify(global.JF.getFormQuestions);
    prom(match.params.id)
      .then((res) => {
        setData({
          id: match.params.id,
          questions: Object.values(res),
        });
        GetSubmissions(match.params.id).then((r) => setSubmissions(r));
        setModal({
          isOpen: false,
          modalName: '',
          redirectUrl: '',
        });
      })
      .catch(() => {
        setModal({
          isOpen: true,
          modalName: 'unAuth',
          redirectUrl: '',
        });
      });
  }, [match.params.id]);

  React.useEffect(() => {
    const prom = GetFormReports(match.params.id);
    prom.then((reps) => {
      if (!reps) {
        setReports([]);
        if (!modal.isOpen) {
          setModal({
            isOpen: true,
            modalName: 'createReport',
            redirectUrl: '',
          });
        }
      } else {
        setReports(reps);
      }
    });
  }, [modal, match.params]);


  return (
    <div>
      <Header />
      <Route
        exact
        path={`${match.url}/:rep`}
        render={(props) => (
          <ReportPicker reports={reports} form={match.params.id} match={props.match} />)}
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
    </div>
  );
}

function ReportPicker({ reports, form, match }) {
  const [rep, setRep] = React.useState([]);
  const [, setModal] = React.useContext(ModalContext);

  React.useEffect(() => {
    const targetRep = reports.filter((r) => r.id == match.params.rep)[0];
    setRep(targetRep);
  }, [match.params.rep]);

  React.useEffect(() => {
    if (rep && rep.length === 0) {
      setModal({
        isOpen: true,
        modalName: 'errorModal',
        redirectUrl: `${process.env.PUBLIC_URL}/${form}`,
      });
    } else {
      setModal({
        isOpen: false,
        modalName: 'errorModal',
        redirectUrl: '',
      });
    }
  }, [rep]);

  const onReportEdit = (report) => {
    EditReport(form, report);
  };

  return (
    <div>
      <Tabs active={match.params.rep}>
        {reports.sort((r1, r2) => r1.id - r2.id).map((r) => (
          <div label={r.name} key={r.id} id={r.id} form={form} />
        ))}
      </Tabs>
      {
        rep && rep.length !== 0
          ? (
            <ReportEditor
              report={rep}
              onReportEdit={onReportEdit}
            />
          )
          : <div />
      }
    </div>
  );
}

// const charts = [{
//   layout: {},
//   options: {},
//   key: {},
// }];
