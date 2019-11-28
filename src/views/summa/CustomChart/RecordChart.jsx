import React from 'react';
import { Bar } from 'react-chartjs-2';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

let elements = 100;
let data1 = [];
let data2 = [];
let data3 = [];
let data4 = [];

for (var i = 0; i <= elements; i++) {
  data1.push(random(0, 100));
  data2.push(random(0, 100));
  // data3.push(random(0, 160));
  // data4.push(random(0, 160));
}

const dataChart = {
  // labels: ['Evaluación Del Valle 2019'],
  datasets: [
    {
      label: 'Ganancias',
      backgroundColor: '#70c4bf',
      borderColor: '#007e85',
      data: data1,
    },
    {
      label: 'Perdidas',
      backgroundColor: '#e15078',
      borderColor: '#d5345b',
      data: data2,
    },
    // {
    //   label: 'Organización de tiempo de trabajo',
    //   backgroundColor: 'rgba(22, 189, 108, .6)',
    //   borderColor: 'rgba(22, 189, 108, 1.0)',
    //   data: data3,
    // },
    // {
    //   label: 'Liderazgo y relaciones en el trabajo',
    //   backgroundColor: 'rgba(255, 90, 78, .6)',
    //   borderColor: 'rgba(255, 90, 78, 1.0)',
    //   data: data4,
    // },
  ]
};

const options = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  elements: {
    line: {
      tension: 0.3,
      borderWidth: 2,
    },
    rectangle: {
      borderWidth: 2,
    },
    point: {
      pointStyle: 'circle',
      borderWidth: 3,
      pointHoverBackgroundColor: '',
    }
  },
  legend: {
    position: 'bottom',
    display: true,
    labels: {
      padding: 20,
      fontSize: 12,
      usePointStyle: true,
    }
  },
  scales: {
    yAxes: [{
      ticks: {
        max: 100,
        min: 0,
        // stepSize: 10,
        padding: 10
      },
      gridLines: {
        tickMarkLength: 20,
        // zeroLineWidth: 2,
      }
    }],
    xAxes: [{
      gridLines: {
        display: true,
        drawTicks: true,
        tickMarkLength: 20,
      },
      ticks: {
        max: 100,
        min: 0,
        stepSize: 10,
      },
    }]
  },
  maintainAspectRatio: false
}

const RecordChart = () =>  ( 
  <Bar data={dataChart} options={options} />
 );
 
export default RecordChart;