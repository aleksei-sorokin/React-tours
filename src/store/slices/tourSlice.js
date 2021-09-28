import {createSlice, createAsyncThunk, createSelector} from "@reduxjs/toolkit";
import axios from "../../core/axios";


export const fetchTours = createAsyncThunk(
    "tours",
    async () => {
        const response = await axios.get("");
        return response.data;
    }
);


const tourSlice = createSlice({
    name: 'tours',
    initialState: {
        tours: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTours.fulfilled, (state, action) => {
            state.tours = action.payload;
        })
    }
});

export const selectAllTours = state => state.tours.tours;

export const selectTours= createSelector(
    [selectAllTours, (state, name) => name],
    (tours, name) => {
        if (!name) {
            return tours;
        }

        let countryFiltred = []
        let nameFiltred = []

        countryFiltred = name.valCity !== 'Все' ? tours.filter(item => item.to === name.valCity) : tours
        nameFiltred = name.valText.trim().length > 0 ? countryFiltred.filter(item => item.name.includes(name.valText)) : countryFiltred

        return nameFiltred;
    });

export const {searchTour, filterTour} = tourSlice.actions;

export default tourSlice.reducer;