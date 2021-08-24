import React, { useState, useReducer, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { TextField } from '@material-ui/core'
import axios from 'axios'

import MemoCart from '../MemoCart/MemoCart'

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

const cartReducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            let isNew = true
            if (state.length === 0) {
                return [{
                    FoodName: action.data.label,
                    FoodID: action.data.foodId,
                    Calorie: action.data.nutrients.ENERC_KCAL,
                    Carb: action.data.nutrients.CHOCDF,
                    Protein: action.data.nutrients.PROCNT,
                    Fat: action.data.nutrients.FAT,
                    quantity: 1
                }]
            }

            let newCart = state.map(e => {
                if (e.FoodName === action.data.label) {
                    isNew = false
                    return {
                        FoodName: e.FoodName,
                        FoodID: e.FoodID,
                        Calorie: e.Calorie,
                        Carb: e.Carb,
                        Protein: e.Protein,
                        Fat: e.Fat,
                        quantity: e.quantity + 1
                    }
                } else {
                    return e
                }
            })

            if (isNew) {
                newCart.push({
                    FoodName: action.data.label,
                    FoodID: action.data.foodId,
                    Calorie: action.data.nutrients.ENERC_KCAL,
                    Carb: action.data.nutrients.CHOCDF,
                    Protein: action.data.nutrients.PROCNT,
                    Fat: action.data.nutrients.FAT,
                    quantity: 1
                })
            }
            return newCart

        case "UPDATE_QTY":
            let newQty = state.map(e => {
                if (e.FoodName === action.data.name) {
                    return {
                        ...e,
                        quantity: action.data.quantity
                    }
                } else {
                    return e
                }
            })
            return newQty

        case "DELETE":
            let removeCart = state.filter(e => (e.FoodName === action.data) ? false : true)
            return removeCart

        case "RESET":
            return []

        default:
            console.log('!@-------Cart Reducer is Broken-------@!');
    }
}

export default function Album() {
    const classes = useStyles();

    const [inputState, setInputState] = useState(null)
    const [searchResult, setSearchResult] = useState(null)

    const [cartState, cartDispatch] = useReducer(cartReducer, [])

    // Total Cal
    const [totalCalState, setTotalCalState] = useState(0)
    const [totalCarbState, setTotalCarbState] = useState(0)
    const [totalProState, setTotalProState] = useState(0)
    const [totalFatState, setTotalFatState] = useState(0)

    useEffect(() => {
        let totalCalorie = cartState.reduce(((acc, e) => acc + e.Calorie * e.quantity), 0)
        setTotalCalState(totalCalorie)
        let totalCarb = cartState.reduce(((acc, e) => acc + e.Carb * e.quantity), 0)
        setTotalCarbState(totalCarb)
        let totalProtein = cartState.reduce(((acc, e) => acc + e.Protein * e.quantity), 0)
        setTotalProState(totalProtein)
        let totalFat = cartState.reduce(((acc, e) => acc + e.Fat * e.quantity), 0)
        setTotalFatState(totalFat)
    }, [cartState])

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
        setInputState(null)
        setSearchResult(null)
        cartDispatch({
            type: "RESET",        
        })}

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
                {
                    cartState.length === 0 ?
                        null
                        :
                        <MemoCart
                            cart={cartState}
                            totalCalorie={totalCalState}
                            totalCarb={totalCarbState}
                            totalProtein={totalProState}
                            totalFat={totalFatState}
                            className="memo-card-div"
                            removeFromCart={(name) => cartDispatch({
                                type: "DELETE",
                                data: name
                            })}
                            updateQty={(name, quantity) => cartDispatch({
                                type: "UPDATE_QTY",
                                data: {
                                    name: name,
                                    quantity: quantity
                                }
                            })}
                        />
                }

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
                                                <p>Protein: {Math.round(card.food.nutrients.PROCNT) + 'g'}</p>
                                                <p>Fat: {Math.round(card.food.nutrients.FAT) + 'g'}</p>
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button
                                                size="small"
                                                color="primary"
                                                onClick={() => cartDispatch({
                                                    type: 'ADD',
                                                    data: card.food
                                                })}
                                            >
                                                ADD TO CALCULATOR
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