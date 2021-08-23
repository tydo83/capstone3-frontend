import React, { useState, useEffect, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import jwtDecode from 'jwt-decode'
import setAuthToken from '../../lib/setAuthToken'
import { checkIsUserLoggedIn } from '../../lib/helpers'
import { createBrowserHistory } from 'history';
import { toast } from 'react-toastify';

import {
    FormControl,
    FormHelperText,
    Input,
    InputLabel,
    Button,
    Grid,
} from "@material-ui/core";

import useInputHooks from '../../hooks/useInputHooks'
import usePasswordHooks from '../../hooks/usePasswordHooks'

let history = createBrowserHistory();

const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(1),
            width: 350,
        },
    },
}))

function SignIn(props) {
    const classes = useStyles();

    const context = useContext(AuthContext)

    const [isButtonDisabled, setIsButtonDisabled] = useState(true)

    const [
        username,
        setUsername,
        inputUserNameError,
        errorUserNameMessage,
        handleInputOnBlur
    ] = useInputHooks()

    const [
        password,
        setPassword,
        passwordError,
        errorPasswordMessage,
        handlePasswordOnBlur
    ] = usePasswordHooks()

    async function handleOnSubmit(e) {
        e.preventDefault()
        try {
            // let result = await axios.post("api/users/login", {
            //     userName: username,
            //     password: password,
            // })
            // dev
            let result = await axios.post("http://localhost:3001/users/login", {
                userName: username,
                password: password,
            })
            localStorage.setItem('jwtToken', result.data.jwtToken)
            let decodedJWTToken = jwtDecode(result.data.jwtToken)
            context.dispatch({ type: "SUCCESS_LOGGED_IN", user: decodedJWTToken.username})
            props.history.push('/search')
        } catch(e) {
            console.log(e)
            toast.error(e.response.data, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    // without onBlurVersion 
    let lengthChecker = username.length > 0 && password.length > 0

    let errChecker = inputUserNameError || passwordError

    // function login() {
    //     let getJwtToken = localStorage.getItem('jwtToken');
    //     if(getJwtToken) {
    //         const currentTime = Date.now() / 1000;
    //         let decodedJWtToken = jwtDecode(getJwtToken);
    //         if(decodedJWtToken.exp < currentTime) {
    //             localStorage.removeItem('jwtToken')
    //             history.push("/login");        
    //         } else {
    //             history.push("/search");        
    //         }
    //     }
    // }

    useEffect(() => {
        if (lengthChecker && !errChecker) {
            setIsButtonDisabled(false)
            // login()
        } else {
            setIsButtonDisabled(true)
        }
    }, [username, password])


    return (
        <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "30vh" }}
        >
            {console.log(context)}
            <Grid item xs={12}>
                <form className={classes.root} autoComplete="on" onSubmit={handleOnSubmit}>
                    <FormControl error={inputUserNameError}>
                        <InputLabel htmlFor="component-username">Username</InputLabel>
                        <Input
                            id="component-username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e)}
                            // onBlur={() => handleInputOnBlur()}
                        />
                        <FormHelperText id="component-error-text">
                            {inputUserNameError && errorUserNameMessage}
                        </FormHelperText>
                    </FormControl>
                    <br />
                    <FormControl error={passwordError}>
                        <InputLabel htmlFor="component-password">Password</InputLabel>
                        <Input
                            type="password"
                            id="component-password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e)}
                            // onBlur={() => handlePasswordOnBlur()}
                        />
                        <FormHelperText id="component-error-text">
                            {passwordError && errorPasswordMessage}
                        </FormHelperText>
                    </FormControl>
                    <br />
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={isButtonDisabled}
                    >Submit</Button>
                </form>
            </Grid>
        </Grid>
    )
}

export default SignIn