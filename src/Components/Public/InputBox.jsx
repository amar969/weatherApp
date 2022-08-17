import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { API_KEY, GetWeatherLatLong } from "../Logic/GetWeatherLatLong";
import { useDispatch, useSelector } from "react-redux";
import { addCoords } from "../../Redux/action";
import "../style/InputBox.css";

export const InputBox = () => {
  const [text, setText] = React.useState("");
  const [loading, setLoading] = React.useState("false");
  const [cityName, setCityName] = React.useState([]);
  const [weather, setWeather] = React.useState([]);
  // const [weather2, setWeather2] = React.useState([]);
  let time = 900;

  

  let dispatch = useDispatch();
  let {coords} = useSelector((state) => state);
  //console.log(coords);

  const handleInput = (e) => {
    setText(e.target.value);
  };

  const textToLat = async () => {
    try {
      let res = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${text}&limit=5&appid=${API_KEY}`
      );
      let data = await res.json();
      console.log("cityName", data.slice(0, 2));
      setCityName(data);
      dispatch(addCoords({ lat: data[0].lat }));
      dispatch(addCoords({ long: data[0].lon }));
      setLoading(true);
    } catch (error) {
      console.log(error);
    }
  };

  const getWeather1 = async () => {
    try {
      // let res = await fetch(
      //   `https://api.openweathermap.org/data/2.5/weather?lat=${
      //     coords[coords.length - 2].lat
      //   }&lon=${coords[coords.length - 1].long}&appid=${API_KEY}&units=metric`
      // );
      let res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${API_KEY}&units=metric`
      )
      let data = await res.json();

      setWeather(data);
      setLoading(true);
      console.log("weather 1", data);
    } catch (error) {
      console.log(error);
    }
  };

  // // Weather 2
  // const getWeather2 = async () => {
  //   try {
  //     let res = await fetch(
  //       `https://api.openweathermap.org/data/2.5/weather?lat=${cityName[1].lat}&lon=${cityName[1].lon}&appid=${API_KEY}&units=metric`
  //     );
  //     let data = await res.json();

  //     setWeather2(data);
  //     setLoading(true);
  //     console.log("weather 2", data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  React.useEffect(() => {
    const timeOut = setTimeout(() => {
      textToLat();
      // getWeather2();
    }, 500);
    return () => {
      clearTimeout(timeOut);
    };
  }, [text, time]);

  React.useEffect(() => {
    getWeather1();
  }, [coords])

  console.log(cityName);

  return (
    <>
      <div className="inputContainer">
        <LocationOnIcon  sx={{ fontSize: "30px" }}  />
        <input value={text} className="inputField" onChange={handleInput} />
        <SearchIcon sx={{ fontSize: "30px" }} />
      </div>

      <div style={{ display: text.length > 0 ? "flex" : "none", width: "100%", margin: "0 10px", flexDirection:"column", position:"absolute", top:"65px", zIndex:"1", opacity:"1", background:"white" }}>
          {cityName.slice(0, 1).map((item) => {
            return (
              <div className="searchResult">
                  {/* <div>
                    {item.name}, {item.state}, {item.country}
                  </div>
                  <div className="weather-icon-temp">
                    {Math.round(weather.main.temp, 2)}°
                    { <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="icons" />}
                  </div> */}
                  <div>
                    {weather.name}
                    , {weather.sys == undefined ? "" : weather.sys.country}
                  </div>
                  <div className="weather-icon-temp">
                    {weather.main == undefined ? "" : Math.ceil(weather.main.temp) }
                    <img src={`http://openweathermap.org/img/wn/${weather.weather == undefined ? "" : weather.weather[0].icon}.png`} alt="icons" />
                    
                  </div>
              </div>
            );
          })}
      </div>
      
        <GetWeatherLatLong />
     
    </>
  );
};
