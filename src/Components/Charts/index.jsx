import React, { useRef, useEffect } from 'react';
import BarChart from './BarChart';
import * as Styles from './styles';
import { SubmissionsContext } from '../../Contexts/SubmissionsContext';
import Logo from '../../opt.svg';
import del from '../../delete.svg';
import mapQuestionAnswers, {
  mapSubmissionsByDate, getAvarageByDate, getHighestByDate, getSumByDate,
} from './Utils';
import { FormDataContext } from '../../Contexts/FormsContext';
import PieChart from './PieChart';
import LineChart from './LineChart';

export default function ChartController({
  children, onClick, index, setPanel, opts, deleteChart,
}) {
  const [submissions] = React.useContext(SubmissionsContext);
  const [formData] = React.useContext(FormDataContext);
  const [data, setData] = React.useState([]);

  useEffect(() => {
    if (!submissions) {
      return;
    }

    if (opts.qid === -1) {
      setData(submissions.reduce(mapSubmissionsByDate(), []));
      return;
    }

    let d;
    switch (opts.dataType) {
      case '1':
        if (opts.second && opts.second.isChecked) {
          d = mapQuestionAnswers(submissions, opts.dateType, opts.qid, opts.second.qid);
        } else {
          d = mapQuestionAnswers(submissions, opts.dateType, opts.qid);
        }
        break;
      case '2':
        d = mapSubmissionsByDate(submissions, opts.dateType);
        break;
      case '3':
        if (opts.second && opts.second.isChecked) {
          d = getAvarageByDate(submissions, opts.dateType, opts.qid, opts.second.qid);
        } else {
          d = getAvarageByDate(submissions, opts.dateType, opts.qid);
        }
        break;
      case '4':
        if (opts.second && opts.second.isChecked) {
          d = getHighestByDate(submissions, opts.dateType, opts.qid, opts.second.qid);
        } else {
          d = getHighestByDate(submissions, opts.dateType, opts.qid);
        }
        break;
      case '5':
        if (opts.second && opts.second.isChecked) {
          d = getSumByDate(submissions, opts.dateType, opts.qid, opts.second.qid);
        } else {
          d = getSumByDate(submissions, opts.dateType, opts.qid);
        }
        break;
      default:
        d = submissions.reduce(mapQuestionAnswers(opts.qid), []);
        break;
    }

    setData(d);
  }, [opts.qid, opts.dataType, opts.type, opts.second, opts.dateType, submissions]);

  const handleClick = (e) => {
    onClick(index);
  };

  const title = () => {
    if (opts.dataType == 2) {
      return ' Submission Count / Date';
    }

    return Object.values(formData.questions).find((q) => q.qid === opts.qid).text;
  };

  if (opts) {
    if (opts.type === 'bar') {
      return (
        <>
          {children && children.length !== 0 ? <Toolbox setPanel={setPanel} deleteChart={deleteChart} /> : null}
          <BarChart
            onClick={handleClick}
            data={data}
            title={title()}
            color={opts.colors[0]}
          />
        </>
      );
    }

    if (opts.type === 'pie') {
      return (
        <>
          {children && children.length !== 0 ? <Toolbox setPanel={setPanel} deleteChart={deleteChart} /> : null}
          <PieChart
            onClick={handleClick}
            data={data}
            title={opts.dataType == 2 ? ' Submission Count / Date' : Object.values(formData.questions).find((q) => q.qid === opts.qid).text}
            color={opts.colors}
          />
        </>
      );
    }
  }

  if (opts.type === 'line') {
    return (
      <>
        {children && children.length !== 0 ? <Toolbox setPanel={setPanel} deleteChart={deleteChart} /> : null}
        <LineChart
          onClick={handleClick}
          data={data}
          title={opts.dataType == 2 ? ' Submission Count / Date' : Object.values(formData.questions).find((q) => q.qid === opts.qid).text}
          color={opts.colors[0]}
        />
      </>
    );
  }


  return null;
}

function Toolbox({ setPanel, deleteChart }) {
  const handleOpenPanel = () => {
    setPanel(true);
  };

  const handleDeleteChart = () => {
    deleteChart();
  };

  return (
    <Styles.Options>
      <Styles.Wrapper onClick={handleOpenPanel}>
        <Styles.Img src={Logo} />
      </Styles.Wrapper>
      <Styles.Wrapper onClick={handleDeleteChart}>
        <Styles.Img src={del} />
      </Styles.Wrapper>
    </Styles.Options>
  );
}
