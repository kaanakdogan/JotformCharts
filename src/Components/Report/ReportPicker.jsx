import React from 'react';
import * as Styles from './styles';
import Tabs from '../Tabs';
import { ModalContext } from '../../Contexts/ModalContext';


export default function ReportPicker({
  reports, form, active, editReport, deleteReport,
}) {
  const [rep, setRep] = React.useState([]);
  const [, setModal] = React.useContext(ModalContext);
  const [reps, setReps] = React.useState([]);

  // React.useEffect(() => {
  //   const targetRep = reports.filter((r) => r.id == match.params.rep)[0];
  //   setRep(targetRep);
  // }, [match.params.rep]);

  React.useEffect(() => {
    console.log(reports);
  }, []);


  React.useEffect(() => {
    const sorted = reports.sort((r1, r2) => r1.id - r2.id);
    console.log(sorted);
    setReps(sorted);
  }, [reports]);

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
    editReport(form, report);
  };

  const onEditReportName = (newName, id) => {
    const reportToReturn = JSON.parse(JSON.stringify(reports.find((r) => r.id === id)));

    reportToReturn.name = newName;

    onReportEdit(reportToReturn);
  };

  const onDeleteReport = (id) => {
    deleteReport(form, id);
  };

  return (
    <>
      <Tabs active={active} editName={onEditReportName} deleteReport={onDeleteReport}>
        {reps.map((r) => (
          <div label={r.name} id={r.id} form={form} />
        ))}
      </Tabs>

    </>
  );
}
