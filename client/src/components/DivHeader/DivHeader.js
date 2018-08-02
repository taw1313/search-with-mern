import React from "react";
import "./DivHeader.css";

const DivHeader = props => (

    <div className='col-md-12 row' id='header'>
        <h3 id='totalCnt'> {props.title} </h3>
        <button type='button' className='btn btn-primary' id={props.btnID} onClick={() => props.action()}> {props.btnID} </button>
    </div>
);

export default DivHeader;