import React from "react";
import Box from "@mui/material/Box";
import { API_KEY } from "./GetWeatherLatLong";
import { useSelector } from "react-redux";
import Umbrella from "@mui/icons-material/Umbrella";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import CloudIcon from "@mui/icons-material/Cloud";
import Brightness3Icon from "@mui/icons-material/Brightness3";
import moment from "moment";
import "../style/GetWeather1Day.css";
import { CircularProgress } from "@mui/material";


export const GetWeather1Day = () => {
  const [weather, setWeather] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const { coords } = useSelector((state) => state);

  const epochToDate = (targetDate) => {
    return moment.unix(targetDate).format("h:mm:ss a");
  };

  const getWeather = async () => {
    try {
      let res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${
          coords[coords.length - 2].lat
        }&lon=${coords[coords.length - 1].long}&appid=${API_KEY}&units=metric`
      );
      let data = await res.json();
      setWeather(data);
      setLoading(true);
      //console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getWeather();
  }, [coords]);

  return (
    <div className="single-day-main-container">
      {loading ? (
        <div className="single-day-weeather-container">
          {/* <Box
            sx={{
              display: "flex",
              width: "50%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {" "}
            {weather.name}{" "}
          </Box> */}
          <Box
            sx={{
              display: "grid",
              padding: "20px",
              gap: "10px",
              gridTemplateColumns: "repeat(2,1fr)",
              gridTemplateRows: "repeat(3,1fr)",
            }}
          >
            <h1>{Math.round(weather.main.temp)}°C</h1>
            {/* Clear sky */}
            {weather.weather[0].icon === "01d" ? (
              <WbSunnyIcon sx={{ color: "#FBB454", fontSize: "50px" }} />
            ) : (
              ""
            )}
            {/* clear night */}
            {weather.weather[0].icon === "01n" ? (
              <Brightness3Icon sx={{ color: "black", fontSize: "50px" }} />
            ) : (
              ""
            )}

            {/* few clouds */}
            {weather.weather[0].icon === "02d" ? (
              <CloudIcon sx={{ color: "skyblue", fontSize: "50px" }} />
            ) : (
              ""
            )}
            {weather.weather[0].icon === "02n" ? (
              <CloudIcon sx={{ color: "skyblue", fontSize: "50px" }} />
            ) : (
              ""
            )}

            {/* Scttered Clouds  */}
            {weather.weather[0].icon === "03d" ? (
              <CloudIcon sx={{ color: "skyblue", fontSize: "50px" }} />
            ) : (
              ""
            )}
            {weather.weather[0].icon === "03n" ? (
              <CloudIcon sx={{ color: "skyblue", fontSize: "50px" }} />
            ) : (
              ""
            )}

            {/* broken Clouds */}
            {weather.weather[0].icon === "04d" ? (
              <CloudIcon sx={{ color: "skyblue", fontSize: "50px" }} />
            ) : (
              ""
            )}
            {weather.weather[0].icon === "04n" ? (
              <CloudIcon sx={{ color: "skyblue", fontSize: "50px" }} />
            ) : (
              ""
            )}

            {/* shower Rain */}
            {weather.weather[0].icon === "09d" ? (
              <Umbrella sx={{ color: "skyblue", fontSize: "50px" }} />
            ) : (
              ""
            )}
            {weather.weather[0].icon === "09n" ? (
              <Umbrella sx={{ color: "skyblue", fontSize: "50px" }} />
            ) : (
              ""
            )}

            {/* rain */}
            {weather.weather[0].icon === "10d" ? (
              <Umbrella sx={{ color: "skyblue", fontSize: "50px" }} />
            ) : (
              ""
            )}
            {weather.weather[0].icon === "10n" ? (
              <Umbrella sx={{ color: "skyblue", fontSize: "50px" }} />
            ) : (
              ""
            )}

            {/* thunderstorm */}
            {weather.weather[0].icon === "11d" ? (
              <ThunderstormIcon sx={{ color: "skyblue", fontSize: "50px" }} />
            ) : (
              ""
            )}
            {weather.weather[0].icon === "11n" ? (
              <ThunderstormIcon sx={{ color: "skyblue", fontSize: "50px" }} />
            ) : (
              ""
            )}

            {/* snow */}
            {weather.weather[0].icon === "13d" ? (
              <AcUnitIcon sx={{ color: "skyblue", fontSize: "50px" }} />
            ) : (
              ""
            )}
            {weather.weather[0].icon === "13n" ? (
              <AcUnitIcon sx={{ color: "skyblue", fontSize: "50px" }} />
            ) : (
              ""
            )}

            {/* mist */}
            {weather.weather[0].icon === "50d" ? (
              <CloudIcon sx={{ color: "skyblue", fontSize: "50px" }} />
            ) : (
              ""
            )}
            {weather.weather[0].icon === "50n" ? (
              <CloudIcon sx={{ color: "skyblue", fontSize: "50px" }} />
            ) : (
              ""
            )}

            {/* <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} style={{ width: "100px" }} alt="icons" /> */}
            <div className="pressure">
              <p>
                {" "}
                <strong> Pressure </strong>{" "}
              </p>{" "}
              <p>{weather.main.pressure} hpa</p>
            </div>
            <div className="pressure">
              <p>
                {" "}
                <strong> Humidity </strong>
              </p>{" "}
              <p>{weather.main.humidity} %</p>
            </div>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <p>
                <strong>Sunrise</strong>
              </p>
              <p>{epochToDate(weather.sys.sunrise)}</p>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <p>
                <strong>Sunset</strong>
              </p>
              <p>{epochToDate(weather.sys.sunset)}</p>
            </Box>
          </Box>
        </div>
      ) : (
        <h1> <CircularProgress/> </h1>
      )}
    </div>
  );
};
