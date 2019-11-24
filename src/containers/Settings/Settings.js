import React from "react"
import automaticModeSvg from "../../assets/images/handfree.png"
import manualModeSvg from "../../assets/images/handheld.png"

import classes from "./Settings.css"
const Settings = ()=>{
    return(
        <div className={classes.Settings}>
            <h1>Choose QR reader mode</h1>
            <img src={manualModeSvg} alt="automatic mode" title="automatic mode"/>
            <p>Hand held mode</p>
            <img src={automaticModeSvg} alt="automatic mode" title="automatic mode"/>
            <p>Hand free mode</p>
        </div>
    )
}
export default Settings