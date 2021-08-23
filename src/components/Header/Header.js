import React, { useReduce, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { NavLink, Link } from "react-router-dom";
import { createBrowserHistory } from 'history';
import { AuthContext } from "../context/AuthContext";
import "./Header.css";
import { checkIsUserLoggedIn }from '../../lib/helpers'
import jwtDecode from 'jwt-decode'

let history = createBrowserHistory();

const useStyle = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
}));

function Header() {
    const classes = useStyle();
    const context = useContext(AuthContext);

    function logout() {
        localStorage.removeItem("jwtToken");
        context.dispatch({ type: "LOGGED_OUT" });
        history.push("/login");        
    }

    useEffect(() => {
        if(checkIsUserLoggedIn()) {
            let getJwtToken = localStorage.getItem('jwtToken');
            let decodedJWtToken = jwtDecode(getJwtToken);
            context.dispatch({ type: "SUCCESS_LOGGED_IN", user: decodedJWtToken.username });
        } else {
            context.dispatch({ type: "LOGGED_OUT" });
        }
    }, [])
    
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        <Link to={checkIsUserLoggedIn() ? "/search" : "/"} className="nav-link">
                            Covid19 Tracker
                        </Link>
                    </Typography>
                    {console.log(context.state)}
                    {context.state.isAuth ? (
                        <>
                            <NavLink
                                to="/profile"
                                exact
                                className="nav-link"
                                activeClassName="active-nav-link"
                            >
                            <Button color="inherit">{context.state.user}</Button>
                            </NavLink>
                            <NavLink
                                to="/login"
                                exact
                                className="nav-link"
                                activeClassName="active-nav-link"
                            >
                                <Button color="inherit" onClick={logout}>
                                    Logout
                            </Button>
                            </NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink
                                to="/login"
                                exact
                                className="nav-link"
                                activeClassName="active-nav-link"
                            >
                                <Button color="inherit">Login</Button>
                            </NavLink>
                            <NavLink
                                to="/sign-up"
                                exact
                                className="nav-link"
                                activeClassName="active-nav-link"
                            >
                                <Button color="inherit">Sign up</Button>
                            </NavLink>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}
export default Header;