import './PublicLists.css'
import Navigation from '../components/Navigation'
import { useEffect, useState } from 'react'; 
import ListPopup from '../components/ListPopup';

function PublicLists() {
  const [ addButtonPopup, setAddButtonPopup ] = useState()
  const [ publicLists, setPublicList ] = useState([])
  const [currentList, setCurrentList] = useState(null)

  useEffect(() =>{
    getLists()
    console.log("test", publicLists)
  }, [])

  async function getLists(){
    await fetch('/heroes/list/recent')
    .then((res) => res.json())
    .then((data) => {
        setPublicList(data)
    });
  }

  async function selectedList(selected, token) {

    await fetch('/heroes/return-list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token,
        selected
      }),
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      setCurrentList(data[0])
    })
  }

    return (
      <div>
        <Navigation/>
        <div id = "center-div">
          <p>public lists for viewing!</p>
          <div id="public-lists">
          {publicLists.map((pubList, index) => (
            <div onClick={() => { selectedList(pubList.listName, pubList.ownerToken); setAddButtonPopup(true); }} key={index} id="public-list-item">
              <p>List Name: {pubList.listName}</p>
              <p>Heroes: {pubList.listContents.length}</p>
              <p>Rating: {pubList.rating}</p>
              <p>Edited Time: {pubList.editedTime}</p>
            </div>
          ))}
        </div>
        </div>

        <div>
          <ListPopup list = {currentList ? currentList : ""}  trigger = {addButtonPopup} setTrigger = {setAddButtonPopup}/></div>
        </div>
    );
  }
  
  export default PublicLists;