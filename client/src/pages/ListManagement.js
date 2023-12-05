import './ListManagement.css'
import Navigation from '../components/Navigation'
import { useState } from 'react'

function ListManagement(){
    const [visibility, setVisibility] = useState(true)
    const [visibleStatus, setVisibleStatus] = useState("Private")

    // list creation variables
    const [listName, setListName] = useState("");
    const [heroList, setHeroList] = useState([])
    const [description, setDescription] = useState("")

    function handleCheckboxChange() {
        setVisibility(!visibility);
        console.log(visibility)
        if(visibility === true){
            setVisibleStatus("Public")
        } else if (visibility === false){
            setVisibleStatus("Private")
        }
    }

    async function createNewList(){

    }

    function selectedList(){

    }

    return(
        <div>
            <Navigation/>
            <div id = "formatting">
                <div id = "selected-list"></div>
                <div id = "lists-div">
                    <div id = "lists-of-lists">
                    </div>
                    <div id = "create-list-div">
                        <p>name of list:</p>
                        <input value = {listName} onChange = {(e) => {setListName(e.target.value)}}></input>

                        <p>heroes in list:</p>
                        <input value = {heroList} onChange = {(e) => {setHeroList(e.target.value)}}></input>

                        <p>description</p>
                        <input value = {description} onChange = {(e) => {setDescription(e.target.value)}}></input>

                        <div>
                        <p>visibility: {visibleStatus}</p>
                            <label className = "switch">
                                <input 
                                type = "checkbox"
                                checked = {visibility}
                                onChange = {handleCheckboxChange}
                                />
                                <span className = "slider"/>
                            </label>
                            <button onClick = {createNewList}>Submit!</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListManagement