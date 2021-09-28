import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Grid, Button, TextField, FormControl} from "@material-ui/core";
import TourCard from "../components/TourCard/tourCard";
import {makeStyles} from "@material-ui/core/styles";
import {clearTours} from "../store/slices/bookSlice";
import { useHistory } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
    form: {
        width: '350px',
        maxWidth: '100%',
        padding: '10px',
        margin: '20px auto'
    },
    input: {
        marginBottom: '20px'
    },
    title: {
        margin: '60px auto'
    }

}));

const Cart = () => {
    document.title='Корзина';
    const [name, setName] = useState();
    const [nameError, setNameError] = useState();
    const [email, setEmail] = useState();
    const [emailError, setEmailError] = useState();
    const [phone, setPhone] = useState();
    const [phoneError, setPhoneError] = useState();
    const [message, setMessage] = useState();
    const [formMess, setFormMess] = useState();
    const [successMessage, setSuccessMessage] = useState('Корзина пуста');
    const classes = useStyles();
    const dispatch = useDispatch();
    const tours = useSelector(state => state.bookTours.bookTours);
    const history = useHistory()

    useEffect(() => {
        if (!emailError && !phoneError && !nameError) {
            setFormMess('');
        }

    }, [emailError, phoneError, nameError])

    const tourCard = tours ? tours.map(item => <TourCard key={item.id} tour={item}/>) : [];

    const emailHandler = (val) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(val).toLowerCase())) {
            setEmailError('Неверный E-mail');
        } else {
            setEmail(val)
            setEmailError('');
        }
    }


    const nameHandler = (val) => {
        if (!val) {
            setNameError('Введите имя');
        } else {
            setName(val);
            setNameError('');
        }
    }

    const phoneHandler = (val) => {
        if (!val) {
            setPhoneError('Введите номер телефона');
        } else {
            setPhone(val)
            setPhoneError('');
        }
    }

    const sendForm = () => {
        if (!email || !name || !phone) {
            setFormMess('Заполните поля')
        }

        if (email && name && phone) {
            const sendFormVal = {
                name: name,
                email: email,
                phone: phone,
                message: message
            };

            console.log('form data', sendFormVal);

            tours.map(item => dispatch(clearTours(item)));

            setSuccessMessage('Заявка отправлена. Наш менеджер свяжется с вами в ближайшее время');

            setTimeout(() => {
                setSuccessMessage('Корзина пуста');
                history.push('/');

            }, 7000)
        }
    }


    return (
        <Grid
            container
            direction="column"
            alignItems="center">
            {
                tours.length === 0 ?
                    <h3 className={classes.title}>
                        {successMessage}
                    </h3>
                    :
                    <Grid
                        sm={10}
                        md={7}
                        xs={12}
                        container
                        direction="row"
                        justifyContent="flex-start"
                        margin="auto">
                        <Grid
                            item
                            xs={12}
                            container
                            direction="row"
                            justifyContent="flex-start"
                            margin="auto"
                        >
                            {tourCard}
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            container
                            direction="row"
                            justifyContent="flex-start"
                            margin="40px auto"
                        >
                            <FormControl className={classes.form} onSubmit={sendForm}>

                                <h2>Бронирование туров</h2>
                                <TextField
                                    className={classes.input}
                                    required
                                    label="Имя"
                                    variant="outlined"
                                    name="name"
                                    helperText={nameError}
                                    onInput={e => nameHandler(e.target.value)}/>
                                <TextField
                                    className={classes.input}
                                    label="E-mail"
                                    variant="outlined"
                                    name="email"
                                    onInput={e => emailHandler(e.target.value)}
                                    helperText={emailError}/>
                                <TextField
                                    className={classes.input}
                                    required
                                    label="Телефон"
                                    variant="outlined"
                                    name="phone"
                                    helperText={phoneError}
                                    onInput={e => phoneHandler(e.target.value)}/>
                                <TextField
                                    className={classes.input}
                                    label="Сообщение"
                                    variant="outlined"
                                    name="message"
                                    onInput={e => setMessage(e.target.value)}
                                />

                                {formMess}
                                <Button variant="contained" color="primary" onClick={sendForm}>Отправить</Button>

                            </FormControl>


                        </Grid>
                    </Grid>
            }


        </Grid>
    )
}

export default Cart;