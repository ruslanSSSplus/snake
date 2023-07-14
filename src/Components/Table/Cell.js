import React from 'react';
import classes from './Cell.module.css'
const Cell = ({el, apple}) => {
    
    return (
        <div className={apple === el ? classes.allRed : el === 111 ? classes.all  : classes.allGreen  }>
               
        </div>
    );
};

export default Cell;