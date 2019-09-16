import React from 'react';
import Tabs from '../Tabs';
import { ModalContext } from '../../Contexts/ModalContext';


export default function ReportPicker({
  reports, form, active, editReport, deleteReport,
}) {
  const [rep, setRep] = React.useState([]);
  const [, setModal] = React.useContext(ModalContext);
  const [reps, setReps] = React.useState([]);

  React.useEffect(() => {
    if (active && reports) {
      const targetRep = reports.find((r) => r.id == active);
      setRep(targetRep);
    }
  }, [active]);

  React.useEffect(() => {
    if (reports && reports.length !== 0) {
      const sorted = reports.sort((r1, r2) => r1.id - r2.id);
      console.log(sorted);
      setReps(sorted);
    }
  }, [reports]);

  React.useEffect(() => {
    console.log({ active, reports, rep: reports.find((r) => r.id === Number(active)) });
    if (reports && active && !reports.find((r) => r.id === Number(active))) {
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
    deleteReport(id);
  };

  return (
    <>
      <Tabs active={active} editName={onEditReportName} deleteReport={onDeleteReport}>
        {reps.map((r) => (
          <div label={r.name} key={r.id} id={r.id} form={form} />
        ))}
      </Tabs>

    </>
  );
}
