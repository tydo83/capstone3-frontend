import React, { useState, useEffect } from 'react'
import axios from "axios";
import mainImage from '../../images/app_main_image.jpeg'
import SearchResult from "../SearchResult/SearchResult";
import { makeStyles } from "@material-ui/core/styles";
import {
    FormControl,
    FormHelperText,
    Input,
    InputLabel,
    Button,
    Grid,
} from "@material-ui/core";

const useStyle = makeStyles(() => ({
    root: {},
}));

export default function Home() {
    const classes = useStyle();

    const [inputState, setInputState] = useState("")
    const [searchResult, setSearchResult] = useState("")

    const searchHandler = async () => {
        try {
            let response = await axios.get(`https://api.edamam.com/api/food-database/v2/parser?app_id=24d3a3bb&app_key=83de39880ed7d89a7e2d427b2c31d0bd%09&ingr=${inputState}&nutrition-type=cooking`)
            setSearchResult(response.data)
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div className={classes.root}>
            <br />
            <Grid container spacing={1}>
                <Grid
                    item xs={6}
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >
                    <img src={mainImage} style={{ width: 500 }} />
                </Grid>
                <Grid
                    item xs={6}
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >
                    <input type="text" onChange={(e) => setInputState(e.target.value)} />
                    <button onClick={searchHandler}> Search </button>
                </Grid>
                <Grid item xs={12}
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >
                    {
                        searchResult === "" ?
                            <p>Calorie Calculator</p>
                            :
                            searchResult.hints.map(item => <SearchResult item={item} />)
                    }
                </Grid>
            </Grid>
        </div>
    )
}
