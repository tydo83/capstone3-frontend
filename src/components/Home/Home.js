import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { TextField } from '@material-ui/core'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
}));

export default function Album() {
    const classes = useStyles();

    const [inputState, setInputState] = useState(null)
    const [searchResult, setSearchResult] = useState(null)

    const searchHandler = async () => {
        try {
            let response = await axios.get(`https://api.edamam.com/api/food-database/v2/parser?app_id=24d3a3bb&app_key=83de39880ed7d89a7e2d427b2c31d0bd%09&ingr=${inputState}&nutrition-type=cooking`)
            setSearchResult(response.data)
            console.log(searchResult)
        } catch (e) {
            console.error(e)
        }
    }

    const resetHandler = () => {
        setSearchResult(null)
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <main>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            CALORIE CALCULATOR
                        </Typography>
                        <Typography variant="h5" align="center" color="textSecondary" paragraph>
                            <TextField
                                id="outlined-basic"
                                label="TYPE FOOD HERE"
                                variant="outlined"
                                onChange={e => setInputState(e.target.value)}
                            />
                        </Typography>
                        <div className={classes.heroButtons}>
                            <Grid container spacing={2} justifyContent="center">
                                <Grid item>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={searchHandler}
                                    >
                                        Search
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button 
                                        variant="outlined" 
                                        color="primary"
                                        onClick={resetHandler}
                                    >
                                        Reset
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                </div>
                <Container className={classes.cardGrid} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {searchResult === null ?
                            <p></p>
                            :
                            searchResult.hints.map((card) => (
                                <Grid item key={card} xs={12} sm={6} md={4}>
                                    <Card className={classes.card}>
                                        <CardContent className={classes.cardContent}>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {card.food.label}
                                            </Typography>
                                            <Typography>
                                                {Math.round(card.food.nutrients.ENERC_KCAL) + ' Calories'} 
                                            </Typography>
                                            <Typography variant="body2" component="p">
                                                <p>Carbs: {Math.round(card.food.nutrients.CHOCDF) + 'g'}</p>
                                                <p>Protein: {Math.round(card.food.nutrients.PROCNT) +'g'}</p>
                                                <p>Fat: {Math.round(card.food.nutrients.FAT) + 'g'}</p>
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small" color="primary">
                                                ADD TO MEMO
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                    </Grid>
                </Container>
            </main>
        </React.Fragment>
    );
}