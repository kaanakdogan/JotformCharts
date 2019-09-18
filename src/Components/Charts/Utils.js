/* eslint-disable func-names */
/* eslint-disable no-extend-native */
function dateToLabel(dateObj) {
  return `${dateObj.day}-${dateObj.month}-${dateObj.year}`;
}

function timeToLabel(timeObj) {
  let hour = Number(timeObj.hourSelect);
  const minute = timeObj.minuteSelect;

  if (timeObj.ampm) {
    hour += 12;
  }

  return `${hour}:${minute}`;
}

function dateObjToLabel(date) {
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
}

Date.prototype.addDays = function (days) {
  const date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

function getDates(startDate, stopDate) {
  const dateArray = new Array();
  let currentDate = startDate;
  while (currentDate <= stopDate) {
    dateArray.push(new Date(currentDate));
    currentDate = currentDate.addDays(7);
  }
  return dateArray;
}

function compareDates(date1, date2) {
  const arr1 = date1.split('-');
  const arr2 = date2.split('-');

  const str1 = `${arr1[2]}${arr1[1]}${arr1[0]}`;
  const str2 = `${arr2[2]}${arr2[1]}${arr2[0]}`;

  return Number(str1) - Number(str2);
}

function parseDate(date) {
  const arr = date.split('-');

  return new Date(arr[2], Number(arr[1]) - 1, arr[0]);
}

function calcWeekNumber(from, to) {
  const t1 = from.getTime();
  const t2 = to.getTime();

  return parseInt((t2 - t1) / (24 * 3600 * 1000 * 7), 10);
}

function labelConvert(submission) {
  if (!submission.answer) {
    return null;
  }

  if (submission.type === 'control_datetime') {
    return dateToLabel(submission.answer);
  } if (submission.type === 'control_time') {
    return timeToLabel(submission.answer);
  }

  return submission.answer;
}

function handleSingleChoice(array, submission, value) {
  const label = labelConvert(submission);

  if (array.filter((o) => o.label === label).length !== 0) {
    array.map((cur) => {
      if (cur.label === label) {
        const ret = cur;
        ret.value += value;
        return ret;
      }
      return cur;
    });

    return array;
  }

  if (submission.answer) {
    array.push({
      label,
      value,
    });
  }
  return array;
}

function handleMultiChoice(array, submission, value) {
  if (!submission.answer) {
    return array;
  }

  for (let i = 0; i < submission.answer.length; i++) {
    const myArr = array.filter((cur) => cur.label === submission.answer[i]);
    if (myArr.length === 0) {
      array.push({
        label: submission.answer[i],
        value: 0,
      });
    }

    array.map((cur) => {
      if (cur.label === submission.answer[i]) {
        return cur.value + value;
      }
      return cur;
    });
  }

  return array;
}

function handleRating(array, submission) {
  if (!submission.answer) {
    return array;
  }

  if (array.length !== submission.stars + 1) {
    for (let i = 0; i <= submission.stars; i++) {
      if (!array.find((a) => a.label == i)) {
        array.push({ label: i, value: 0 });
      }
    }
  }

  array.map((cur) => {
    if (cur.label == submission.answer) {
      return cur.value++;
    }
    return cur;
  });

  return array;
}

export default function mapQuestionAnswers(qid, qid2) {
  return function reducer(array, current) {
    if (!array) {
      array = [];
    }

    const answ2 = qid2 ? Number(current.answers[qid2].answer) : 1;

    if (current.answers[qid].type === 'control_checkbox') {
      return handleMultiChoice(array, current.answers[qid], answ2);
    }

    if (current.answers[qid].type === 'control_rating') {
      return handleRating(array, current.answers[qid]);
    }

    return handleSingleChoice(array, current.answers[qid], answ2);
  };
}

export function mapSubmissionsByDate(qid) {
  return function reducer(array, current) {
    if (!array) {
      array = [];
    }

    let label;
    if (qid) {
      label = dateToLabel(current.answers[qid].answer);
    } else {
      const arr = current.created_at.split(' ')[0].split('-');
      label = `${arr[2]}-${arr[1]}-${arr[0]}`;
    }

    if (array.filter((o) => o.label === label).length === 0) {
      array.push({
        label,
        value: 1,
      });
    } else {
      array.map((o) => {
        if (o.label === label) {
          return o.value++;
        }
        return o;
      });
    }

    return array;
  };
}

export function getAvarageByDate(submissions, qid, qid2) {
  function reducer(array, current) {
    if (!array) {
      array = [];
    }

    if (!current.answers[qid].answer) {
      return array;
    }

    let date;
    if (qid2) {
      date = dateToLabel(current.answers[qid2].answer);
    } else {
      const arr = current.created_at.split(' ')[0].split('-');
      date = `${arr[2]}-${arr[1]}-${arr[0]}`;
    }

    if (array.find((e) => e.date === date)) {
      array.map((e) => {
        if (e.date === date) {
          const newArr = [...(e.values)];
          newArr.push(current.answers[qid].answer);
          e.values = newArr;
          return e.values;
        }

        return e;
      });
    } else {
      array.push({
        date,
        values: [current.answers[qid].answer],
      });
    }

    return array;
  }

  const data = submissions.reduce(reducer, []);

  const toReturn = [];
  for (let i = 0; i < data.length; i++) {
    let c = 0;
    let av = 0;
    for (c; c < data[i].values.length; c++) {
      av += Number(data[i].values[c]);
    }

    av /= c;
    toReturn.push({
      label: data[i].date,
      value: av,
    });
  }

  return toReturn;
}


export function getHighestByDate(submissions, cat, qid, qid2) {
  function reducer(array, current) {
    if (!array) {
      array = [];
    }

    if (!current.answers[qid].answer) {
      return array;
    }

    let date;
    if (qid2) {
      date = dateToLabel(current.answers[qid2].answer);
    } else {
      const arr = current.created_at.split(' ')[0].split('-');
      date = `${arr[2]}-${arr[1]}-${arr[0]}`;
    }

    if (array.find((e) => e.date === date)) {
      array.map((e) => {
        if (e.date === date) {
          const newArr = [...(e.values)];
          newArr.push(current.answers[qid].answer);
          e.values = newArr;
          return e.values;
        }

        return e;
      });
    } else {
      array.push({
        date,
        values: [current.answers[qid].answer],
      });
    }

    return array;
  }

  const data = submissions.reduce(reducer, []);

  const toReturn = [];
  for (let i = 0; i < data.length; i++) {
    let c = 0;
    let highest = 0;
    for (c; c < data[i].values.length; c++) {
      if (highest < Number(data[i].values[c])) {
        highest = Number(data[i].values[c]);
      }
    }

    toReturn.push({
      label: data[i].date,
      value: highest,
    });
  }

  toReturn.sort((a, b) => compareDates(a.label, b.label));

  if (cat === 'week') {
    const weekArr = [];
    const strtDate = parseDate(toReturn[0].label);
    const endDate = parseDate(toReturn[toReturn.length - 1].label);
    const weeks = getDates(strtDate, endDate);

    for (let i = 0; i < weeks.length; i++) {
      let value = 0;
      for (let c = 0; c < toReturn.length; c++) {
        if (calcWeekNumber(weeks[i], parseDate(toReturn[c].label)) === 0) {
          value += toReturn[c].value;
        }
      }

      weekArr.push({
        label: dateObjToLabel(weeks[i]),
        value,
      });
    }

    return weekArr;
  }

  return toReturn;
}

export function getSumByDate(submissions, qid, qid2) {
  function reducer(array, current) {
    if (!array) {
      array = [];
    }

    if (!current.answers[qid].answer) {
      return array;
    }

    let date;
    if (qid2) {
      date = dateToLabel(current.answers[qid2].answer);
    } else {
      const arr = current.created_at.split(' ')[0].split('-');
      date = `${arr[2]}-${arr[1]}-${arr[0]}`;
    }

    if (array.find((e) => e.date === date)) {
      array.map((e) => {
        if (e.date === date) {
          const newArr = [...(e.values)];
          newArr.push(current.answers[qid].answer);
          e.values = newArr;
          return e.values;
        }

        return e;
      });
    } else {
      array.push({
        date,
        values: [current.answers[qid].answer],
      });
    }

    return array;
  }

  const data = submissions.reduce(reducer, []);

  const toReturn = [];
  for (let i = 0; i < data.length; i++) {
    let av = 0;
    for (let c; c < data[i].values.length; c++) {
      av += Number(data[i].values[c]);
    }

    toReturn.push({
      label: data[i].date,
      value: av,
    });
  }


  return toReturn;
}
