import React from "react";
import {Button, Grid, Card, CardContent, CardMedia, Typography} from "@material-ui/core";
import Rating from '@material-ui/lab/Rating';
import {makeStyles} from '@material-ui/core/styles';
import {bookTour, unbookTour} from "../../store/slices/bookSlice";

import {useDispatch, useSelector} from "react-redux";

const useStyles = makeStyles((theme) => ({
    media: {
        width: '100%',
        height: 200,
    },
    rating: {
        marginTop: 10,
        marginBottom: 10,
    },
    card: {
        paddingBottom: 20,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
    },
    cardInner: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    button: {
        marginTop: 'auto'
    },
    mainItem: {
        padding: 15
    }
}));


const TourCard = (props) => {
    const bookedTours = useSelector(state => state.bookTours.bookTours);
    const tour = props.tour;
    const classes = useStyles();
    const dispatch = useDispatch();
    let cancelButton = false;


    const setTour = () => {
        dispatch(bookTour(tour));
    }

    const deleteTour = () => {
        dispatch(unbookTour({tour}))
    }

    for (let i=0; i < bookedTours.length; i++) {
        if (tour.id === bookedTours[i].id) {
            cancelButton = true;
            break;
        }
        cancelButton = false;
    }

    return (
        <Grid
            item
            lg={4}
            md={6}
            xs={12}
            className={classes.mainItem}
        >

            <Card className={classes.card}>
                <CardMedia
                    image={tour.photo}
                    className={classes.media}
                />
                <CardContent
                    className={classes.cardInner}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {tour.name}
                    </Typography>

                    <Rating
                        name="read-only"
                        value={tour.rate}
                        precision={0.1}
                        readOnly
                        className={classes.rating}
                    />
                    <Typography variant="h6">
                        {tour.from} - {tour.to}
                    </Typography>
                    <br/>
                    <Typography variant="h6">
                        {tour.dateStart} - {tour.dateEnd}
                    </Typography>
                    <br/>
                    <Typography variant="h6">
                        <b>{tour.price} $</b>
                    </Typography>
                </CardContent>
                {cancelButton ?
                    <Button className={classes.button} variant="contained" color="secondary" onClick={deleteTour}>Удалить</Button>
                    :
                    <Button className={classes.button} variant="contained" color="primary" onClick={setTour}>Забронировать</Button>
                }
            </Card>
        </Grid>
    );
}

export default TourCard;
