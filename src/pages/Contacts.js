import React from 'react'
import {Box, Grid, Typography} from "@material-ui/core";

import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        margin: '50px auto',
        textAlign: 'left'
    },
    img: {
        width: '100%',
        margin: '20px auto'
    },
    item: {
        margin: '20px 0'
    }
}));

const Contacts = () => {
    document.title='Контакты';
    const classes = useStyles();
    return (
        <Grid
            className={classes.container}
            container
            xs={10}
            md={7}>
            <Grid
                className={classes.item}
                item
                container
                md={6}
                xs={12}
            >
                <Box>
                    <h2>ул. Скрыганова, 14, <br/>5-й этаж, г. Минск</h2>

                    <Typography>
                        бизнес-центр&nbsp;«Контур»,
                    </Typography>
                    <br/>
                    <Typography>
                        м. Молодежная, 5 минут пешком.
                    </Typography>
                    <br/>
                    <div className="block-inners-content">
                        <sub>Троллейбусы: 4, 7, 9, 13, 44, 57</sub>
                        <br/>
                        <sub>Автобусы: 40, 46, 50, 78, 163</sub>
                        <br/>
                        <sub>Маршрутка:
                        1212</sub>
                    </div>
                </Box>
            </Grid>
            <Grid
                className={classes.item}
                item
                container
                md={6}
                xs={12}>

                <iframe
                    title="Карта"
                    src="https://yandex.by/map-widget/v1/-/CCUi5Ec9tB"
                    width="100%"
                    height="400"
                    frameBorder="0"
                    allowFullScreen="true"></iframe>

            </Grid>
        </Grid>
    )
}

export default Contacts;