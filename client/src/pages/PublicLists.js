import './PublicLists.css'
import Navigation from '../components/Navigation'
import { useEffect, useState } from 'react'; 
import ListPopup from '../components/ListPopup';

function PublicLists() {
  // determine constants
  const [ addButtonPopup, setAddButtonPopup ] = useState()
  const [ publicLists, setPublicList ] = useState([])
  const [currentList, setCurrentList] = useState(null)

  useEffect(() =>{
    getLists()
  }, [])

  // gets all public lists based on recency
  async function getLists(){
    await fetch('/heroes/list/recent')
    .then((res) => res.json())
    .then((data) => {
        setPublicList(data)
    });
  }

  // determines the selected list
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
              <p>User: {pubList.ownerUser}</p>
              <p>Heroes: {pubList.listContents.length}</p>
              <div>
              {pubList.listReviews ? (
                <p>
                  Rating:{" "}
                  {(
                    pubList.listReviews.reduce((sum, currentVal) => sum + currentVal, 0) /
                    pubList.listReviews.length
                  ).toFixed(2)}
                </p>
              ) : (
                ""
              )}
            </div>
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