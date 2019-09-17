import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js';
import { ChartDiv } from './styles';

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


export default function BarChart(props) {
  const canvasRef = useRef(null);
  const myChart = useRef(null);

  useEffect(() => {
    console.log(props.data);
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
  }, [props.data, props.title, props.color]);

  const handleClick = (e) => {
    props.onClick();
  };

  return (
    <ChartDiv onClick={handleClick}>
      <canvas ref={canvasRef} />
    </ChartDiv>
  );
}
