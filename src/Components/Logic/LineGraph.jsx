import { useSelector } from "react-redux";
import { API_KEY } from "./GetWeatherLatLong";
import React from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { borderLeft } from "@mui/system";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const LineGraph = () => {
  const { coords } = useSelector((state) => state);
  const [fiveData, setFiveData] = React.useState([]);

  const getWeather5Days = async () => {
    try {
      let res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${coords[coords.length-2].lat}&lon=${coords[coords.length-1].long}&appid=${API_KEY}&units=metric`
      );
      let data = await res.json();
      //console.log(data.list);
      let weather = [];
      for (let i = 0; i < 10; i++) {
        weather.push(data.list[i]);
        setFiveData(weather);
        //console.log(data.list[i])
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getWeather5Days();
  }, [coords]);

  let temp = [];
  fiveData.map((item) => {
    temp.push(Math.round(item.main.temp ));
  });

  const labels = temp.map((item) => item + "°");
  const data = {
    labels,
    datasets: [
      {
        label: "Weather Forcast",
        data: temp,
        //labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        borderColor: "skyblue",
        backgroundColor: "white",
        pointRadius: 5,
        borderWidth: 5,
        fontWeight: "bold", 
      },
    ],
  };

  const options = {
    responsive: true,
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
    scales: {
      y: { display: false },
    },
    
  };

  return (
    <>
      <Line
        style={{ width: "100%", height: "100%" }}
        options={options}
        data={data}
      />
    </>
  );
};
