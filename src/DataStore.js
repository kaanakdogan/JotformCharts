import localforage from 'localforage';

export function GetReports() {
  return localforage.getItem('Reports');
}

export async function GetFormReports(formId) {
  const reports = await GetReports();

  if (reports) {
    const formReps = reports.filter((r) => r.id == formId)[0];

    if (formReps) {
      return formReps.reports;
    }
  }
}

export async function GetNextId(formId) {
  const reports = await GetFormReports(formId);
  if (reports) {
    let rep = reports[0];
    for (let i = 0; i < reports.length; i += 1) {
      if (rep.id < reports[i].id) {
        rep = reports[i];
      }
    }

    return rep.id;
  }
  return 0;
}

export async function AddReport(formId, report) {
  let formReports = await GetFormReports(formId);
  let reports = await GetReports();
  if (!formReports) {
    formReports = [];
  }
  if (!reports) {
    reports = [];
  }
  let id = await GetNextId(formId);
  id += 1;
  console.log(id);
  const newRep = report;
  newRep.id = id;

  formReports.push(newRep);

  const newReps = Object.values(reports).filter((r) => r.id !== formId.toString());
  newReps.push({ id: formId, reports: formReports });
  return localforage.setItem('Reports', newReps);
}

export async function RemoveReport(report) {
  const reports = await GetReports();

  const newReps = reports.filter((r) => r.id !== report.id);
  return localforage.setItem('Reports', newReps);
}

export async function CleanDatabase() {
  return localforage.removeItem('Reports');
}
