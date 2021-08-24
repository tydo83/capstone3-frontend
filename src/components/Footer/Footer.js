import React from "react";
import './Footer.css'

import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
}));

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                CODEMONKEY TD
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

function Footer() {
    const classes = useStyles();
    return (
        <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
            WYE
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
            Code Immersive Capstone #3
        </Typography>
        <Copyright />
        </footer>
        )
}
export default Footer;