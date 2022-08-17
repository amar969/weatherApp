import {legacy_createStore as createStore} from "redux"; 
import { reducers } from "./reducer.js";

const initalState = {
    coords: [],
    city: []
}

export const store = createStore(reducers, initalState,  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())


store.subscribe(() => console.log(store.getState()))