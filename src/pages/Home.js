import React, {useEffect, useState, useMemo} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Grid, TextField, Button, Select, MenuItem, Box} from "@material-ui/core";

import {makeStyles} from '@material-ui/core/styles';
import TourCard from "../components/TourCard/tourCard";

import {fetchTours, selectTours} from "../store/slices/tourSlice";
import {useHistory} from "react-router-dom";
import {Pagination} from "@material-ui/lab";
import {useQuery} from '../hooks';

const rowPerPage = 6;

const useStyles = makeStyles((theme) => ({
    container: {
        margin: '50px auto',
        textAlign: 'left'
    },
    searchPanel: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: '20px'
    },
    select: {
        width: '100px',
        margin: ' 10px'
    },
    searchText: {
        width: '300px',
        margin: '10px'
    },
    button: {
        width: '150px',
        margin: ' 10px'
    },
    pagination: {
        marginTop: '30px'
    }
}));

const Home = () => {
    document.title='Главная';
    const classes = useStyles();
    const [city, setCity] = useState('Все');
    const [searchParams, setSearchParams] = useState();
    const dispatch = useDispatch();
    let searchText;
    const history = useHistory();
    const query = useQuery();



    const getSearchText = (event) => {
        searchText = event.target.value;
    };

    const getSearchCity = (event) => {
        setCity(event.target.value)
    };

    const search = () => {
        const params = {
            valCity: city,
            valText: !searchText ? '' : searchText
        };
        setSearchParams(params);
    }

    useEffect(() => {
        dispatch(fetchTours());
    }, [dispatch]);


    const tours = useSelector(state => selectTours(state, searchParams));

    const page = Number(query.get("page")) || 1;
    const pageCount = useMemo(
        () => Math.ceil(tours.length / rowPerPage),
        [tours.length]
    );

    useEffect(() => {
        if (page > pageCount)
            history.push({pathname: "/", search: `?page=${1}`});
    }, [history, page, pageCount]);

    const setCurrentPage = (_, page) =>
        history.push({pathname: "/", search: `?page=${page}`});

    return (
        <Grid
            className={classes.container}
            container
            direction="column"
            alignItems="center">
            <Box
                className={classes.searchPanel}>
                <Select
                    className={classes.select}
                    value={city}
                    onChange={getSearchCity}
                >
                    <MenuItem value="Все">Страна</MenuItem>
                    <MenuItem value="Россия">Россия</MenuItem>
                    <MenuItem value="Грузия">Грузия</MenuItem>
                    <MenuItem value="Египет">Египет</MenuItem>
                    <MenuItem value="Турция">Турция</MenuItem>
                    <MenuItem value="Бельгия">Бельгия</MenuItem>
                </Select>
                <TextField
                    className={classes.searchText}
                    label="Название тура"
                    value={searchText}
                    variant="filled"
                    onChange={getSearchText}/>
                <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    onClick={search}>Поиск</Button>
            </Box>
            <Grid
                item
                sm={10}
                md={7}
                xs={12}
                container
                direction="row"
                justifyContent="flex-start"
                margin="auto"
            >
                {tours
                    .slice(
                        (page - 1) * rowPerPage,
                        (page - 1) * rowPerPage + rowPerPage
                    )
                    .map((tour) => (
                        <TourCard key={tour.id} tour={tour}/>

                    ))}
            </Grid>

            {
                tours.length > 0 ?
                    <Pagination
                        className={classes.pagination}
                        page={page}
                        count={pageCount}
                        color="primary"
                        onChange={setCurrentPage}
                    />
                    :
                    ""
            }

        </Grid>
    )
}

export default Home;