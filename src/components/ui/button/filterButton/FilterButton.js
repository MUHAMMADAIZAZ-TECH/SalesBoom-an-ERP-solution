import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import FilterListIcon from '@material-ui/icons/FilterList';

function FilterButton({ clicked }) {
    // const useStyles = makeStyles((theme) => ({
    //     margin: {
    //         margin: theme.spacing(1),
    //     },
    //     extendedIcon: {
    //         marginRight: theme.spacing(1),
    //     },
    // }));

    // const classes = useStyles();

    return (
        <Fab
            onClick={clicked}
            color="primary"
            aria-label="filter"
            size='small'
        >
            <FilterListIcon />
        </Fab>
    );
}

export default FilterButton;
