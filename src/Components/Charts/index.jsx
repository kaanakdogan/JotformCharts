import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js';
import getFeeds from './Test';
import { SubmissionsContext } from '../../Contexts/SubmissionsContext';

function mapQuestionAnswers(qid) {
  return function reducer(array, current) {
    if (!array) {
      array = [];
    }

    if (array.filter((o) => o.label === current.answers[qid].answer).length !== 0) {
      array.map((cur) => {
        if (cur.label === current.answers[qid].answer) {
          return cur.value++;
        }
        return cur;
      });

      return array;
    }

    array.push({
      label: current.answers[qid].answer,
      value: 1,
    });
    return array;
  };
}

export default function DashBoard() {
  const [submissions] = React.useContext(SubmissionsContext);
  const [data, setData] = React.useState([]);

  useEffect(() => {
    const a = submissions.reduce(mapQuestionAnswers('6'), []);
    setData(a);
  }, []);

  return (
    <BarChart data={data} title="Single Choice" color="#70CAD1" />
  );
}

const opts = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    yAxes: [{
      ticks: {
        min: 0,
      },
    }],
  },

};

function BarChart(props) {
  const canvasRef = useRef(null);
  const myChart = useRef(null);

  useEffect(() => {
    myChart.current = new Chart(canvasRef.current, {
      type: 'bar',
      options: opts,
      data: {
        labels: props.data.map((d) => d.label),
        datasets: [{
          label: props.title,
          data: props.data.map((d) => d.value),
          backgroundColor: props.color,
        }],
      },
    });
  }, []);

  useEffect(() => {
    myChart.current.data = {
      labels: props.data.map((d) => d.label),
      datasets: [{
        label: props.title,
        data: props.data.map((d) => d.value),
        backgroundColor: props.color,
      }],
    };
    myChart.current.update();
  }, [props]);

  return (
    <div style={{ position: 'relative', height: '100%', width: '100%' }}>
      <canvas ref={canvasRef} />
    </div>
  );
}
