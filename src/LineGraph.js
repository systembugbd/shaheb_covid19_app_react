import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";

const options = {
  legend: {
    display: true,
 
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  animations: {
    tension: {
      duration: 1000,
      easing: 'linear',
      from: 1,
      to: 0,
      loop: true
    }
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

const buildChartData = (data, casesType) => {
  let chartData = [];
  let lastDataPoint;
  for (let date in data.cases) {
    if (lastDataPoint) {
      let newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
  }
  return chartData;
};



/*
* Component LineGraph
 */
function LineGraph({ casesType, country}) {
 const [data, setData] = useState({});
 
  

  useEffect(() => {
 
  

    const fetchData = async () => {
      await fetch(`https://disease.sh/v3/covid-19/historical/all?lastdays=120`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let chartData = buildChartData(data, casesType);
          
          setData(chartData);
        
        });
    };
    fetchData();

  }, [casesType]);


  return (
    <div className="lineGraph">
      {data?.length > 0 && (
        <Line
        
          data={{
            datasets: [
              {
              backgroundColor: "#f16f00",
              borderColor: "#f16f00",
              borderWidth: 1,
              data: data,
              type: 'bar',
              label: 'New Cases',
            
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
}

export default LineGraph;