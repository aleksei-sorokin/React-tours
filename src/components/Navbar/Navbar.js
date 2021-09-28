import React from 'react';
import {NavLink} from "react-router-dom";
import './navbar.css';
import {useSelector} from "react-redux";
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    disabled: {
        pointerEvents: 'none',
        opacity: '0.7'
    },

}));

const Navbar = () => {
    const classes = useStyles();
    const tours = useSelector(state => state.bookTours.bookTours);

    return <nav className="navbar">
        <ul>
            <li>
                <NavLink exact={true} to="/">Главная</NavLink>
            </li>
            <li>
                <NavLink exact={true} to="/about">О нас</NavLink>
            </li>
            <li>
                <NavLink exact={true} to="/contacts">Контакты</NavLink>
            </li>
            <li>
                <NavLink exact={true} className={tours.length > 0 ? '' : classes.disabled} to="/cart">Корзина</NavLink>
            </li>
        </ul>
    </nav>
}

export default Navbar;