/* eslint-disable react/prop-types */
import React from 'react';
import { Route, matchPath } from 'react-router-dom';
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

export default function Reports({ match, location }) {
  const [data, setData] = React.useContext(FormDataContext);
  const [, setSubmissions] = React.useContext(SubmissionsContext);
  const [modal, setModal] = React.useContext(ModalContext);
  const [reports, setReports] = React.useState([]);
  const [active, setActive] = React.useState();
  const [didMount, setDidMount] = React.useState(false);

  const getReports = () => {
    const prom = GetFormReports(match.params.id);
    prom.then((res) => setReports(res));
  };

  const editReport = (report) => {
    console.log(report);
    EditReport(match.params.id, report);
  };

  const deleteReport = (repId) => {
    RemoveReport(match.params.id, repId).then(() => getReports());
  };

  const getParams = (pathname) => {
    const matchProfile = matchPath(pathname, {
      path: '/:id/:rep',
    });
    return (matchProfile && matchProfile.params) || {};
  };

  React.useEffect(() => {
    setModal({ isOpen: true, modalName: 'loading' });
  }, []);

  React.useEffect(() => {
    if (data.id === match.params.id) {
      return;
    }

    setModal({ isOpen: true, modalName: 'loading' });
    setDidMount(false);
    const prom = promisify(global.JF.getFormQuestions);
    prom(match.params.id)
      .then((res) => {
        setData({
          id: match.params.id,
          questions: Object.values(res),
        });
      })
      .then(() => {
        GetSubmissions(match.params.id).then((r) => setSubmissions(r));
      })
      .catch(() => {
        setModal({
          isOpen: true,
          modalName: 'unAuth',
          redirectUrl: '',
        });
      });

    const prom2 = GetFormReports(match.params.id);
    prom2.then((reps) => {
      if (!reps) {
        setReports([]);
      } else {
        setReports(reps);
      }
      setDidMount(true);
      setModal({ isOpen: false });
    });
  }, [match.params.id]);

  React.useEffect(() => {
    if (didMount && reports.length === 0) {
      setModal({
        isOpen: true,
        modalName: 'createReport',
        redirectUrl: '',
        callback: getReports,
      });
    }
  }, [didMount, reports]);

  return (
    <>
      {didMount
        ? (
          <>
            <Header />
            <ReportPicker
              active={active}
              reports={reports}
              form={match.params.id}
              editReport={editReport}
              deleteReport={deleteReport}
              cb={getReports}
            />
            <Route
              path={`${match.url}/:rep`}
              render={(props) => {
                setActive(props.match.params.rep);
                console.log(reports);
                if (reports.find((r) => r.id == props.match.params.rep)) {
                  return (<ReportEditor report={reports.find((r) => r.id == props.match.params.rep)} onReportEdit={editReport} />);
                }
              }}
            />
          </>
        ) : null}
    </>
  );
}
