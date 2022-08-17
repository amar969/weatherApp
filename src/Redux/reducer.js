import { ADD_CITY, ADD_COORDS } from "./actionType.js";


export const reducers = (store, action) => {

    switch( action.type ){
       
        case ADD_COORDS: 
        return{
            ...store, coords: [ ...store.coords, action.payload]
        }

        case ADD_CITY:
        return{
            ...store, coords: [...store.city, action.payload]
        }

        default: {
            return store
        }
    }

}