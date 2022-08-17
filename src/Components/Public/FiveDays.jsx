import React from 'react'
import { GetWeather1Day } from '../Logic/GetWeather1Day';
import Box from "@mui/material/Box";
import { LineGraph } from '../Logic/LineGraph';
import "../style/FiveDays.css";

export const FiveDay = () => {

    return(
        <>
       
        <div className='container'>
            <GetWeather1Day /> 
            <div className='graphContainer'>
            <LineGraph /> 
            </div>
        </div>

        </>
    )
}