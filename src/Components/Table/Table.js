import React from 'react';

import Cell from "./Cell";
import classes from './Cell.module.css'

const Table = ({board, apple}) => {

    return (
        <div className={classes.table}>
            {
                board.map(el => <Cell el = {el} apple ={apple} key = {Math.random()}/>)
            }
        </div>
    );
};

export default Table;