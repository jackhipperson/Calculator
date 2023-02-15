import React from "react";
import style from './Screen.module.css'

const Screen = props => {
    return (
        <React.Fragment>
        <div className={style.screen}><p className={style.text}>{props.currentVal}</p></div>
        </React.Fragment>
    )
}

export default Screen;