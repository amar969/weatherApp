import { ADD_COORDS } from "./actionType.js";
import { ADD_CITY} from "./actionType.js";

export const addCoords = (payload) => ({
    type: ADD_COORDS, 
    payload: payload
})

export const addCity = (payload) => ({
    type: ADD_CITY, 
    payload: payload
})



