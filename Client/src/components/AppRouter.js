import React from 'react';
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Home from '../components/Home';
import Nav from '../components/Nav';
import About from '../components/About';

const AppRouter = () => {
    return(
        <Router>
            <Nav />
            <Switch>
                <Route exact path = "/">
                    <Home />
                </Route>
                <Route exact path= "/about">
                    <About />
                </Route>
            </Switch>
        </Router>
    );
}

export default AppRouter;