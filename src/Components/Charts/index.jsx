import React, { useRef, useEffect } from 'react';
import BarChart from './BarChart';
import * as Styles from './styles';
import { SubmissionsContext } from '../../Contexts/SubmissionsContext';
import Logo from '../../opt.svg';
import del from '../../delete.svg';
import mapQuestionAnswers, { mapSubmissionsByDate, getAvarageByDate, getHighestByDate } from './Utils';
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

    let d;
    console.log(submissions);
    switch (opts.dataType) {
      case '1':
        d = submissions.reduce(mapQuestionAnswers(opts.qid), []);
        break;
      case '2':
        d = submissions.reduce(mapSubmissionsByDate(), []);
        break;
      case '3':
        d = getAvarageByDate(opts.qid, submissions);
        break;
      case '4':
        d = getHighestByDate(opts.qid, submissions);
        console.log();
        break;
      default:
        d = submissions.reduce(mapQuestionAnswers(opts.qid), []);
        break;
    }

    setData(d);
    console.log(d);
  }, [opts.qid, opts.dataType, opts.type, submissions]);

  const handleClick = (e) => {
    onClick(index);
  };

  if (opts) {
    if (opts.type === 'bar') {
      return (
        <>
          {children && children.length !== 0 ? <Toolbox setPanel={setPanel} deleteChart={deleteChart} /> : null}
          <BarChart
            onClick={handleClick}
            data={data}
            title={opts.dataType == 2 ? ' Submission Count / Date' : Object.values(formData.questions).find((q) => q.qid === opts.qid).text}
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
    setPanel();
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
