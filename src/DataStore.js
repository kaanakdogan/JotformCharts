import localforage from 'localforage';
import { async } from 'q';

let reports = [];

export async function GetReports() {
  if (reports) {
    reports = await localforage.getItem('Reports');
    if (!reports) {
      reports = [];
    }
  } else {
    reports = [];
  }

  return reports;
}

export async function GetFormReports(formId) {
  reports = await GetReports();

  console.log(reports);


  setTimeout(() => {

  }, 2000);
  if (reports) {
    // eslint-disable-next-line eqeqeq
    const formReps = reports.filter((r) => r.id == formId)[0];

    if (formReps) {
      return formReps.reports;
    }
  }
}

export async function GetNextId(formId) {
  const formReports = await GetFormReports(formId);
  if (formReports && formReports.length > 0) {
    let rep = formReports[0];
    for (let i = 0; i < formReports.length; i += 1) {
      if (rep.id < formReports[i].id) {
        rep = formReports[i];
      }
    }
    return rep.id;
  }
  return 0;
}

export async function AddReport(formId, report) {
  reports = await GetReports();
  let formReports = await GetFormReports(formId);
  if (!formReports) {
    formReports = [];
  }
  let id = await GetNextId(formId);
  id += 1;
  const newRep = report;
  newRep.id = id;

  formReports.push(newRep);

  reports = Object.values(reports).filter((r) => r.id !== formId.toString());
  reports.push({ id: formId, reports: formReports });
  return localforage.setItem('Reports', reports);
}

export async function EditReport(formId, report) {
  reports = await GetReports();
  let formReports = await GetFormReports(formId);
  if (!formReports) {
    formReports = [];
  }

  console.log(report);

  formReports = formReports.filter((r) => r.id !== report.id);
  formReports.push(report);

  const newReps = Object.values(reports).filter((r) => r.id !== formId.toString());

  newReps.push({ id: formId, reports: formReports });
  return localforage.setItem('Reports', newReps);
}

export async function RemoveReport(formId, id) {
  reports = await GetReports();
  let formReports = await GetFormReports(formId);
  if (!formReports) {
    formReports = [];
  }

  formReports = formReports.filter((r) => r.id !== id);

  const newReps = Object.values(reports).filter((r) => r.id !== formId.toString());
  newReps.push({ id: formId, reports: formReports });
  return localforage.setItem('Reports', newReps);
}

export async function CleanDatabase() {
  return localforage.removeItem('Reports');
}
