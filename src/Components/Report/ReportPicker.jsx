import React from 'react';
import Tabs from '../Tabs';
import { ModalContext } from '../../Contexts/ModalContext';


export default function ReportPicker({
  reports, form, active, editReport, deleteReport, cb,
}) {
  const [reps, setReps] = React.useState([]);

  React.useEffect(() => {
  }, [active]);

  React.useEffect(() => {
    if (reports) {
      const sorted = reports.sort((r1, r2) => r1.id - r2.id);
      setReps(sorted);
    }
  }, [reports]);

  const onReportEdit = (report) => {
    editReport(report);
  };

  const onEditReportName = (newName, id) => {
    const reportToReturn = JSON.parse(JSON.stringify(reports.find((r) => r.id === id)));

    reportToReturn.name = newName;

    console.log(reportToReturn);

    onReportEdit(reportToReturn);
  };

  const onDeleteReport = (id) => {
    deleteReport(id);
  };

  return (
    <>
      <Tabs active={active} editName={onEditReportName} deleteReport={onDeleteReport} cb={cb}>
        {reps.map((r) => (
          <div label={r.name} key={r.id} id={r.id} form={form} />
        ))}
      </Tabs>

    </>
  );
}
