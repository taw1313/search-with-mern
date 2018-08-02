import React from "react";
import "./HeadLine.css";

const HeadLine = props => (
    <tr>
        <td className='numField'> {props.index} </td>
        <td className='headLineField' aid={props.id}> {props.headline} </td>
        <td className='dateField' aid={props.id}> {props.date} </td>
        <td className={props.iconClass} aid={props.id} onClick={() => props.action(props.id)}> </td>
    </tr>
);

export default HeadLine;