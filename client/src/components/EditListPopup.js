import React from "react";
import { useState, useEffect } from "react";

import './EditListPopup.css'

function EditListPopup(props){

    useEffect(() => {
        setListName(props.listName)
        setDescription(props.description)

        if(props.visibility === 'Public'){
            setVisibility(true)
        } else {
            setVisibility(false)
        }
        setListOfHeroes(props.heroes)
        setEditedTime(props.editedTime)
    }, [props])

    const [listName, setListName] = useState("")
    const [description, setDescription] = useState("")
    const [visibility, setVisibility] = useState(false)
    const [listOfHeroes, setListOfHeroes] = useState([])
    const [editedTime, setEditedTime] = useState("")

    return (props.trigger) ? (
        <div id = "popup">
        <div id = "bckgrnd">
            <div id = "edit-cont">
                <p>Change List Name</p>
                <input value = {listName} onChange = {(e) => setListName(e.target.value)}></input>
                <p>Change Description</p>
                <input value = {description} onChange = {(e) => setDescription(e.target.value)}></input>
                <p>Change Visibility (Checked for Public)</p>
                <input checked = {visibility} onChange = {() => setVisibility(!visibility)} type = "checkbox"></input>
                <p>Change Heroes:</p>
                <input  value = {listOfHeroes} onChange = {(e) => setListOfHeroes(e.target.value)}></input>
                <br/>
                <button id = "finished-editing">Submit!</button>
            </div>
            <button id = "close-btn" onClick = {() => props.setTrigger(false)}>Close</button>
        </div>
    </div>
    ): "";
}

export default EditListPopup