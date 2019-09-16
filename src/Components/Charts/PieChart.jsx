import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js';
import { ChartDiv } from './styles';

export default function PieChart(props) {
  const canvasRef = useRef(null);
  const myChart = useRef(null);

  useEffect(() => {
    myChart.current = new Chart(canvasRef.current, {
      type: 'pie',
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
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
      <canvas style={{ padding: '10px' }} ref={canvasRef} />
    </ChartDiv>
  );
}
