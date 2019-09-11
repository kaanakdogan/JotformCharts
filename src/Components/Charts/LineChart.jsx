import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js';

export default function LineChart(props) {
  const canvasRef = useRef(null);
  const myChart = useRef(null);

  useEffect(() => {
    myChart.current = new Chart(canvasRef.current, {
      type: 'line',
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                min: 0,
              },
            },
          ],
        },
      },
      data: {
        labels: props.data.map((d) => d.label),
        datasets: [{
          label: props.title,
          data: props.data.map((d) => d.value),
          backgroundColor: props.color,
          pointRadius: 2,
          fill: 'false',
          borderColor: props.color,
          borderWidth: 1,
          lineTension: 0,
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
        pointRadius: 2,
        fill: 'false',
        borderColor: props.color,
        borderWidth: 1,
        lineTension: 0,
      }],
    };
    myChart.current.update();
  }, [props.data, props.title, props.color]);

  const handleClick = (e) => {
    props.onClick();
  };

  return (
    <div onClick={handleClick} style={{ position: 'relative', height: '100%', width: '100%' }}>
      <canvas ref={canvasRef} />
    </div>
  );
}
