import React from "react";

const SizedBox = (props)=>{
    const width = props.width? props.width:0
    const height = props.height? props.height:0
    const style={width:width,height:height}
    return (
        <div style={style}></div>
    )
}

export default SizedBox;