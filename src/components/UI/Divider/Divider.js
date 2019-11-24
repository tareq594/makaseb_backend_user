import React from 'react';
import classes from './Divider.css'

const Divider = ({color})=>{
    return(
        <div className={classes.Divider} style={{backgroundColor:color}}></div>
    )
}

export default Divider