import React, { useState, useEffect } from "react";
import "./LineGraph.style.css";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
import { Card, CardContent, Typography } from "@material-ui/core";

// This is option to show the hover effect of this linegraph
const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
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

function LineGraph({ casesType }) {
  const [data, setData] = useState({});

  const buildChartData = (data, casesType) => {
    const chartData = [];
    let lastDataPoint;
    for (let date in data.cases) {
      if (lastDataPoint) {
        const newDataPoint = {
          x: date,
          y: data[casesType][date] - lastDataPoint,
        };
        chartData.push(newDataPoint);
      }
      lastDataPoint = data[casesType][date];
    }
    return chartData;
  };

  useEffect(() => {
    const getFetchData = async () => {
      await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=150")
        .then((response) => response.json())
        .then((data) => {
          const chartData = buildChartData(data, casesType);
          setData(chartData);
        })
        .catch((err) => console.log(err));
    };
    getFetchData();
  }, [casesType]);

  return (
    <div>
      <Card>
        <CardContent className="graph-card">
          <h5>Worldwide new {casesType} in a graph:</h5>
          {data?.length > 0 && (
            <Line
              options={options}
              data={{
                datasets: [
                  {
                    data: data,
                    backgroundColor: "rgba(204,16,52,0.8)",
                    borderColor: "#CC1034",
                  },
                ],
              }}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default LineGraph;
