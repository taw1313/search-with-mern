import React from "react";
import "./DivHeader.css";

const DivHeader = props => (

    <div className='col-md-12 row' id='header'>
        <h3 id='totalCnt'> Total Articles found: {props.count} </h3>
        <button type='button' className='btn btn-primary' id='scrapeBtn' onClick={() => props.scrapeForNews()}> Scrape </button>
    </div>
);

export default DivHeader;