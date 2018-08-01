import React from "react";
import "./HeadLine.css";

const HeadLine = props => (
    <tr>
        <td className='numField'> {props.index} </td>
        <td className='headLineField' aid={props.id}> {props.headline} </td>
        <td className='numNotesField' aid={props.id}> {props.numNotes} </td>
        <td className='fas fa-trash-alt delField' aid={props.id} onClick={() => props.removeArticle(props.id)}> </td>
    </tr>
);

export default HeadLine;