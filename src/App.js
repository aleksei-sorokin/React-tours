import './App.css';
import {Header} from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import About from "./pages/About";
import Home from "./pages/Home";
import Contacts from "./pages/Contacts"
import Cart from "./pages/Cart"
import {BrowserRouter, Route, Switch} from 'react-router-dom';



function App() {
    const HeaderNavbar = Header()(Navbar);

    return (
        <BrowserRouter>
            <div className="App" >
                <HeaderNavbar/>
                <Switch>
                    <Route path="/" exact={true} component={Home}/>
                    <Route path="/about/" exact={true} component={About}/>
                    <Route path="/contacts/" exact={true} component={Contacts}/>
                    <Route to="/cart/" exact={true} component={Cart}/>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
