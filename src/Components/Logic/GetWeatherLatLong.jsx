import React from "react";
import Box from "@mui/material/Box";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import CloudIcon from "@mui/icons-material/Cloud";
import { useSelector } from "react-redux";
import Umbrella from "@mui/icons-material/Umbrella";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import Brightness3Icon from "@mui/icons-material/Brightness3";
import moment from "moment";
import "../style/GetWeatherLatLon.css";

export const API_KEY = "19d08b6d9b3103aa80a76b45dc102a96";

export const GetWeatherLatLong = () => {
  const [laoding, setLoading] = React.useState(false);
  const [fivedata, setFiveData] = React.useState([]);
  const { coords } = useSelector((state) => state);
  const epochToDate = (targetDate) => {
    return moment.unix(targetDate).format("dddd");
  };

  const getWeather5Days = async () => {
    try {
      let res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${
          coords[coords.length - 2].lat
        }&lon=${coords[coords.length - 1].long}&appid=${API_KEY}&units=metric`
      );
      let data = await res.json();
      console.log(data);
      let weather = [];
      for (let i = 0; i < data.list.length; i += 8) {
        weather.push(data.list[i]);
        setFiveData(weather);
        //console.log(data.list[i])
      }

      setLoading(true);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getWeather5Days();
  }, [coords]);

  return (
    <div className="fiveday-main-container">
      {laoding ? (
        <div className="fiveDayContainer">
          {fivedata.map((item) => {
            return (
              <div>
                <p>
                  {" "}
                  <strong> {epochToDate(item.dt).slice(0, 3)} </strong>{" "}
                </p>
                <Box
                  sx={{
                    display: "flex",
                    alignContent: "center",
                    justifyContent: "center",
                    gap: "5px",
                  }}
                >
                  <p>
                    {" "}
                    <strong>{Math.round(item.main.temp_max)}° </strong>
                  </p>
                  <p> {Math.round(item.main.temp_min)}°</p>
                </Box>
                {/* Clear sky */}
                {item.weather[0].icon === "01d" ? (
                  <WbSunnyIcon sx={{ color: "#FBB454", fontSize: "50px" }} />
                ) : (
                  ""
                )}
                {/* clear night */}
                {item.weather[0].icon === "01n" ? (
                  <Brightness3Icon sx={{ color: "black", fontSize: "50px" }} />
                ) : (
                  ""
                )}

                {/* few clouds */}
                {item.weather[0].icon === "02d" ? (
                  <CloudIcon sx={{ color: "skyblue", fontSize: "50px" }} />
                ) : (
                  ""
                )}
                {item.weather[0].icon === "02n" ? (
                  <CloudIcon sx={{ color: "skyblue", fontSize: "50px" }} />
                ) : (
                  ""
                )}

                {/* Scttered Clouds  */}
                {item.weather[0].icon === "03d" ? (
                  <CloudIcon sx={{ color: "skyblue", fontSize: "50px" }} />
                ) : (
                  ""
                )}
                {item.weather[0].icon === "03n" ? (
                  <CloudIcon sx={{ color: "skyblue", fontSize: "50px" }} />
                ) : (
                  ""
                )}

                {/* broken Clouds */}
                {item.weather[0].icon === "04d" ? (
                  <CloudIcon sx={{ color: "skyblue", fontSize: "50px" }} />
                ) : (
                  ""
                )}
                {item.weather[0].icon === "04n" ? (
                  <CloudIcon sx={{ color: "skyblue", fontSize: "50px" }} />
                ) : (
                  ""
                )}

                {/* shower Rain */}
                {item.weather[0].icon === "09d" ? (
                  <Umbrella sx={{ color: "skyblue", fontSize: "50px" }} />
                ) : (
                  ""
                )}
                {item.weather[0].icon === "09n" ? (
                  <Umbrella sx={{ color: "skyblue", fontSize: "50px" }} />
                ) : (
                  ""
                )}

                {/* rain */}
                {item.weather[0].icon === "10d" ? (
                  <Umbrella sx={{ color: "skyblue", fontSize: "50px" }} />
                ) : (
                  ""
                )}
                {item.weather[0].icon === "10n" ? (
                  <Umbrella sx={{ color: "skyblue", fontSize: "50px" }} />
                ) : (
                  ""
                )}

                {/* thunderstorm */}
                {item.weather[0].icon === "11d" ? (
                  <ThunderstormIcon
                    sx={{ color: "skyblue", fontSize: "50px" }}
                  />
                ) : (
                  ""
                )}
                {item.weather[0].icon === "11n" ? (
                  <ThunderstormIcon
                    sx={{ color: "skyblue", fontSize: "50px" }}
                  />
                ) : (
                  ""
                )}

                {/* snow */}
                {item.weather[0].icon === "13d" ? (
                  <AcUnitIcon sx={{ color: "skyblue", fontSize: "50px" }} />
                ) : (
                  ""
                )}
                {item.weather[0].icon === "13n" ? (
                  <AcUnitIcon sx={{ color: "skyblue", fontSize: "50px" }} />
                ) : (
                  ""
                )}

                {/* mist */}
                {item.weather[0].icon === "50d" ? (
                  <CloudIcon sx={{ color: "skyblue", fontSize: "50px" }} />
                ) : (
                  ""
                )}
                {item.weather[0].icon === "50n" ? (
                  <CloudIcon sx={{ color: "skyblue", fontSize: "50px" }} />
                ) : (
                  ""
                )}

                {/* <img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`} style={{ width: "40px" }} alt="icons" /> */}
                <p> {item.weather[0].description} </p>
              </div>
            );
          })}
        </div>
      ) : (
        " "
      )}
    </div>
  );
};
