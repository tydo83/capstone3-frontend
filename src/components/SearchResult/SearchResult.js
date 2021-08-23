import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


import {
    FormControl,
    FormHelperText,
    Input,
    InputLabel,
    Button,
    Grid,
} from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        minWidth: 475,
    },

    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});



export default function SearchResult(props) {
    return (
        <div>

            <Card>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        {props.item.food.label}
                    </Typography>
                    <Typography variant="body2" component="p">
                        <p>Carbs: {Math.round(props.item.food.nutrients.CHOCDF)}</p>
                        <p>Energy: {Math.round(props.item.food.nutrients.ENERC_KCAL)}</p>
                        <p>Fat: {Math.round(props.item.food.nutrients.FAT)}</p>
                        <p>Protein: {Math.round(props.item.food.nutrients.PROCNT)}</p>
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">ADD</Button>
                </CardActions>
            </Card>

        </div>
    )
}
