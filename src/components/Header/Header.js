import React, {Component} from "react";
import {AppBar} from "@material-ui/core";



const Header = () => Component => props => {
    const Navbar = <Component {...props}/>

    return (
        <AppBar
            position="static"
        >
            {Navbar}
        </AppBar>
    );
}

export {Header};
