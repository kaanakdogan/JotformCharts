/* eslint-disable react/prop-types */
import React from 'react';
import { Route } from 'react-router-dom';
import { FormDataContext } from '../../Contexts/FormsContext';
import { ModalContext } from '../../Contexts/ModalContext';
import promisify from '../../Utils';
import { GetFormReports, EditReport, RemoveReport } from '../../DataStore';
import Header from '../Header';
import { SubmissionsContext } from '../../Contexts/SubmissionsContext';
import ReportEditor from './ReportEditor';
import ReportPicker from './ReportPicker';

async function GetSubmissions(formId) {
  const submissions = await promisify(global.JF.getFormSubmissions)(formId, { limit: 10000 });
  return submissions;
}

export default function Reports({ match }) {
  const [, setData] = React.useContext(FormDataContext);
  const [, setSubmissions] = React.useContext(SubmissionsContext);
  const [modal, setModal] = React.useContext(ModalContext);
  const [reports, setReports] = React.useState([]);
  const [active, setActive] = React.useState();

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

  const editReport = (report) => {
    EditReport(match.params.id, report).then((res) => {
      console.log(res);
    });
  };

  const deleteReport = (repId) => {
    RemoveReport(match.params.id, repId).then((res) => {
      console.log(res);
    });
  };

  return (
    <>
      <Header />
      <ReportPicker active={active} reports={reports} form={match.params.id} editReport={editReport} deleteReport={deleteReport} />
      <Route
        path={`${match.url}/:rep`}
        render={(props) => {
          setActive(props.match.id);
          console.log({ reports, props, a: reports.find((r) => r.id == props.match.params.rep) });
          return (<ReportEditor report={reports.find((r) => r.id == props.match.params.rep)} onReportEdit={editReport} />);
        }}
      />
    </>
  );
}
