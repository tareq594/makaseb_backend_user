import React from 'react';
import classes from './WhiteCard.css'

const WhiteCard = ({children})=>{
    return(
        <div className={classes.Card}>
        {children}
        </div>
    )
}

export default WhiteCard