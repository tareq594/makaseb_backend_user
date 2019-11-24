import React from 'react'
import  classes  from './ContactElement.css';



const ContactElement = (props)=>{
    return(
        <div className={classes.ContactElement}>
        <div className={classes.Icon}>
            {props.children}
        </div>
        <p className={classes.Title}>{props.title}</p>
        <p>{props.value}</p>
        </div>
    )
}

export default ContactElement