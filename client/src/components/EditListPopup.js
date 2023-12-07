import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import './EditListPopup.css'

function EditListPopup(props){    
    const navigate = useNavigate()

    useEffect(() => {
        setNewListName(props.listName)
        setDescription(props.description)

        if(props.visibility === 'Public'){
            setVisibility(true)
        } else {
            setVisibility(false)
        }
        setListOfHeroes(props.heroes)
    }, [props])

    const originalListName = props.listName
    const [newListName, setNewListName] = useState("")
    const [description, setDescription] = useState("")
    const [visibility, setVisibility] = useState(true)
    const [listOfHeroes, setListOfHeroes] = useState([])
    const [currentTime, setCurrentTime] = useState(new Date());
    const [visibleStatus, setVisibleStatus] = useState('Private');

    async function saveEditList(){
        const token = localStorage.getItem('token')

        setCurrentTime(new Date());
        const editedTime = currentTime.toLocaleString()
        const listContents = listOfHeroes.map((hero) => parseInt(hero.trim(), 10));
        
        for (let i = 0; i < listContents.length; i++) {
            const listContentAsInt = parseInt(listContents[i], 10);
        
            if (isNaN(listContentAsInt) || listContentAsInt >= 734) {
                alert("Your List Contents are not valid.");
                return false;
            }
        }

        await fetch ('/heroes/edit-list', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token,
                originalListName,
                newListName,
                listContents,
                editedTime,
                visibleStatus,
                description
            })
          })
          .then((res) => res.json())
          .then((data) => {
                alert("Success!")
          })
    }

    function handleCheckboxChange(){
        setVisibility(!visibility);
        setVisibleStatus(!visibility ? 'Public' : 'Private');
    }

    return (props.trigger) ? (
        <div id = "popup">
        <div id = "bckgrnd">
            <div id = "edit-cont">
                <p>Change List Name</p>
                <input value = {newListName} onChange = {(e) => setNewListName(e.target.value)}></input>
                <p>Change Description</p>
                <input value = {description} onChange = {(e) => setDescription(e.target.value)}></input>
                <p>Change Visibility (Checked for Public)</p>
                <input checked = {visibility} onChange={handleCheckboxChange} type = "checkbox"></input>
                <p>Change Heroes:</p>
                <input  value = {listOfHeroes} onChange = {(e) => setListOfHeroes((e.target.value).trim().split(','))}></input>
                <br/>
                <button onClick = {() => {saveEditList()
                    props.setTrigger(false)
                    navigate(0)}} id = "finished-editing">Submit!</button>
            </div>
            <button id = "close-btn" onClick = {() => props.setTrigger(false)}>Close</button>
        </div>
    </div>
    ): "";
}

export default EditListPopup