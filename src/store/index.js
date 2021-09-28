import {configureStore} from "@reduxjs/toolkit";
import toursReducer from "./slices/tourSlice";
import bookReducer from "./slices/bookSlice"

export default configureStore({
    reducer: {
        tours: toursReducer,
        bookTours: bookReducer
    }
})