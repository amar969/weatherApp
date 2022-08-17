import {useSelector, useDispatch} from "react-redux"
import { addCoords } from "../../Redux/action.js";
import React from "react";

export function Latitude(){
    
let late = useSelector((state) => state  )
  const dispatch = useDispatch()
  
const success = (position) => {
      dispatch(addCoords({ "lat" : position.coords.latitude}));
      dispatch(addCoords({ "long" : position.coords.longitude}));
      localStorage.setItem("lat", JSON.stringify(position.coords.latitude))
      localStorage.setItem("long", JSON.stringify(position.coords.longitude))
}

const options = {
    enableHighAccuracy: false,
    maximumAge: 2000,
    timeout: 1000
  };

const error = (error) => {
    console.log(error)
}
  
React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error, options)
}, [1])
}

