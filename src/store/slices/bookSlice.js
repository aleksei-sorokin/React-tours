import {createSlice} from "@reduxjs/toolkit";


const bookSlice = createSlice({
    name: 'bookTours',
    initialState: {
        bookTours: []
    },
    reducers: {
        bookTour(state, action) {
            state.bookTours.push(action.payload);
        },
        unbookTour(state, action) {
            state.bookTours = state.bookTours.filter(item => item.id !== action.payload.tour.id);
        },
        clearTours(state, action) {
           state.bookTours = state.bookTours.filter(item => item.id !== action.payload.id);
        },
    },
});

export const {bookTour, unbookTour, clearTours} = bookSlice.actions;

export default bookSlice.reducer;