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
  const [, setData] = React.useContext(FormDataContext);
  const [, setSubmissions] = React.useContext(SubmissionsContext);
  const [modal, setModal] = React.useContext(ModalContext);
  const [reports, setReports] = React.useState([]);
  const [active, setActive] = React.useState();
  const [didMount, setDidMount] = React.useState(false);

  const editReport = (report) => {
    EditReport(match.params.id, report);
  };

  const deleteReport = (repId) => {
    RemoveReport(match.params.id, repId).then((res) => {
      setReports(res.find((r) => r.id == match.params.id).reports);
    });
  };

  const getParams = (pathname) => {
    const matchProfile = matchPath(pathname, {
      path: '/:id/:rep',
    });
    return (matchProfile && matchProfile.params) || {};
  };

  const getReports = () => {
    const prom = GetFormReports(match.params.id);
    prom.then((res) => setReports(res));
  };

  React.useEffect(() => {
    setDidMount(false);
    const prom = promisify(global.JF.getFormQuestions);
    prom(match.params.id)
      .then((res) => {
        setData({
          id: match.params.id,
          questions: Object.values(res),
        });
        setDidMount(true);
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
  }, [match.params.id]);

  React.useEffect(() => {
    if (!match.params.id) {
      return;
    }

    const prom = GetFormReports(match.params.id);
    prom.then((reps) => {
      if (!reps) {
        setReports([]);
        if (!modal.isOpen) {
          setModal({
            isOpen: true,
            modalName: 'createReport',
            redirectUrl: '',
            callback: getReports,
          });
        }
      } else {
        setReports(reps);
        // setModal({ isOpen: false, modalName: 'loading' });
      }
    });
  }, [match.params.id]);

  return (
    <>
      <Header />
      {didMount
        ? (
          <>
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
