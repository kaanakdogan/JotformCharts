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

function handleSingleChoice(array, submission) {
  const label = labelConvert(submission);

  if (array.filter((o) => o.label === label).length !== 0) {
    array.map((cur) => {
      if (cur.label === label) {
        return cur.value++;
      }
      return cur;
    });

    return array;
  }

  if (submission.answer) {
    array.push({
      label,
      value: 1,
    });
  }
  return array;
}

function handleMultiChoice(array, submission) {
  if (!submission.answer) {
    return array;
  }

  console.log({ array, answers: submission.answer });

  for (let i = 0; i < submission.answer.length; i++) {
    const myArr = array.filter((cur) => cur.label === submission.answer[i]);
    console.log({ array, myArr });
    if (myArr.length === 0) {
      console.log('here');
      array.push({
        label: submission.answer[i],
        value: 0,
      });
    }

    array.map((cur) => {
      if (cur.label === submission.answer[i]) {
        return cur.value++;
      }
      return cur;
    });
  }

  return array;
}

export default function mapQuestionAnswers(qid) {
  return function reducer(array, current) {
    if (!array) {
      array = [];
    }
    // debugger;

    console.log(array);

    if (current.answers[qid].type === 'control_checkbox') {
      return handleMultiChoice(array, current.answers[qid]);
    }

    return handleSingleChoice(array, current.answers[qid]);
  };
}
