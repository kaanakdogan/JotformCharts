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
      console.log({ cur, label, value });
      if (cur.label === label) {
        console.log(cur.value + value);
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
      label = current.created_at.split(' ')[0];
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

export function getAvarageByDate(qid, submissions) {
  console.log(submissions);
  function reducer(array, current) {
    if (!array) {
      array = [];
    }

    if (!current.answers[qid].answer) {
      return array;
    }

    const date = current.created_at.split(' ')[0];

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


export function getHighestByDate(qid, submissions) {
  console.log(submissions);
  function reducer(array, current) {
    if (!array) {
      array = [];
    }

    if (!current.answers[qid].answer) {
      return array;
    }

    const date = current.created_at.split(' ')[0];

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

  return toReturn;
}
