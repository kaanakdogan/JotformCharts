import localforage from 'localforage';

export function GetReports() {
  return localforage.getItem('Reports');
}

export async function AddReport(report) {
  const reports = await GetReports();
  reports.push(report);
  return localforage.setItem('Reports', reports);
}

export async function RemoveReport(report) {
  const reports = await GetReports();

  const newReps = reports.filter((r) => r.name !== report.name);
  return localforage.setItem('Reports', newReps);
}
