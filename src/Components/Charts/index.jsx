import React, { useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import BarChart from './BarChart';
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
    let d;
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
        break;
      default:
        d = submissions.reduce(mapQuestionAnswers(opts.qid), []);
        break;
    }

    setData(d);
    console.log(d);
  }, [opts.qid, opts.dataType, opts.type]);

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
            title={opts.dataType == 2 ? ' Submission Count Per Day' : Object.values(formData.questions).find((q) => q.qid === opts.qid).text}
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
            title={opts.dataType == 2 ? ' Submission Count Per Day' : Object.values(formData.questions).find((q) => q.qid === opts.qid).text}
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
          title={opts.dataType == 2 ? ' Submission Count Per Day' : Object.values(formData.questions).find((q) => q.qid === opts.qid).text}
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
    <Options>
      <Wrapper onClick={handleOpenPanel}>
        <Img src={Logo} />
      </Wrapper>
      <Wrapper onClick={handleDeleteChart}>
        <Img src={del} />
      </Wrapper>
    </Options>
  );
}

const Img = styled.img`
  height: 15px;
`;

const Wrapper = styled.div`
padding 5px;
text-align: center;
cursor: pointer;
`;

const Open = keyframes`
0% {
  right: 0;
  opacity: 0;
}

50% {
  opacity: 0;
}
100% {
  right: -35px;
  opacity: 1;
}
`;

const Options = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  opacity: 0;
  height: auto;
  background-color: rgb(76, 127, 244);
  cursor: default;
  z-index: 1;
  padding: 5px 0px;
  border-radius: 4px;
  animation: ${Open} 0.2s ease 0s 1 normal forwards running;
`;
