import './ListManagement.css';
import Navigation from '../components/Navigation';
import { useState, useEffect } from 'react';
import EditListPopup from '../components/EditListPopup';

function ListManagement() {
  const [visibility, setVisibility] = useState(true);
  const [visibleStatus, setVisibleStatus] = useState('Private');
  const [userLists, setUserLists] = useState([]);

  // list creation variables
  const [listName, setListName] = useState('');
  const [heroList, setHeroList] = useState([]);
  const [description, setDescription] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentList, setCurrentList] = useState(null)
  const [heroesInList, setHeroesInList] = useState([])
  const [buttonSelected, setButtonSelected] = useState(false)

  // manage list popup
  const [addButtonPopup, setAddButtonPopup] = useState()
  const [ownerUser, setOwnerUser] = useState()


  useEffect(() => {
    containsList();
    findUsername();
  }, []);

  const loggedIn = localStorage.getItem('token');
    
  async function findUsername(){
      const token = loggedIn
      await fetch('/authy/token/list/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token
          }),
        })
        .then((res) => res.json())
        .then((data) => {
          setOwnerUser(data)
        })
  }

  function handleCheckboxChange() {
    setVisibility(!visibility);
    setVisibleStatus(visibility ? 'Public' : 'Private');
  }

  async function createNewList() {
    if(userLists.length > 20){
      return ("You have too many lists! You are limited to 20!")
    }

    setCurrentTime(new Date());
    const editedTime = currentTime.toLocaleString()
    const token = localStorage.getItem('token');
    const listContents = heroList.trim().split(',').map((hero) => parseInt(hero.trim(), 10));

    await fetch('/heroes/listOfLists', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ownerUser,
        token,
        listName,
        listContents,
        description,
        visibleStatus,
        editedTime
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.message === "success"){
          containsList();
        } else {
          alert("Your list name must be unique, and attributes must be valid.")
        }
      });
  }

  async function findHeroes(selected){
    setButtonSelected(!buttonSelected)
    
    const token = localStorage.getItem('token');
    await fetch('/heroes/list/hero-info', {
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
        const list = [];
        for(let i = 0; i < data.length; i++){
          const extractedFields = {
            id: data[i]._doc.id,
            name: data[i]._doc.name,
            publisher: data[i]._doc.Publisher
          };
      
          list.push(extractedFields);
        }

        setHeroesInList(list)
      });
  }

  async function containsList() {
    const token = localStorage.getItem('token');
    await fetch('/heroes/user-lists', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUserLists(data);
      });
  }

  async function selectedList(selected) {
    setButtonSelected(false)
    const token = localStorage.getItem('token');

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
      setCurrentList(data[0])
    })
  }

  async function deleteList(selected){
    const token = localStorage.getItem('token');

    await fetch('/heroes/delete-list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token,
        selected
      })
    })
    .then((res) => res.json())
    .then((data) => {
      if(data.message === 'Deleted'){
        alert("Successfully deleted list.")
        containsList()
        setCurrentList(null)
      } else {
        alert("Error finding list.")
      }
    })
  }

  return (
    <div>
      <Navigation />
      <div id="formatting">
        <div id="selected-list">
          {currentList ? <div id = "center">
            <p>List Name: {currentList.listName}</p>
            <p>List Description: {currentList.listDescription}</p>
            <p>Heroes: {currentList.listContents.map((hero, index) => (
              <span key={index}>{hero.trim()}, </span>
            ))}</p>
            <p>List Visibility: {currentList.listVisibility}</p>
            <p>Last Edited: {currentList.editedTime}</p>
            <button onClick = {() => {findHeroes(currentList.listName)}} id = "show-hero-info">Show info for each hero!</button>
            {buttonSelected ? <p id = "span-format">{heroesInList.map((hero, index) => (
              <span key = {index}>ID: {hero.id} Name: {hero.name} <br/> Publisher: {hero.publisher}<br/><br/></span>
            ))}</p>: ""}
            <button onClick = {() => {setAddButtonPopup(true)}} id = "edit-list-btn">Edit List!</button>
            <button onClick = {() => {
              if(window.confirm("Are you sure you want to delete this list?")){
                deleteList(currentList.listName)
              } else {
                // do nothing
              }
              }} id = "delete-btn">Delete List</button>
          </div> : <p>Selected List Here!</p>}
        </div>
        <div id="lists-div">
          <div id="lists-of-lists">
            <div id = "list-containers">
            {userLists.map((list) => (
                <div key={list.listName} onClick = {() => {selectedList(list.listName)}} id = "one-container">
                    <p id = "name-of-list">{list.listName}</p>
                    <p id = "modified-time">Last Modified: {list.editedTime}</p>
                </div>
              ))}
            </div>
          </div>
          <div id="create-list-div">
            <p>name of list:</p>
            <input id = "name-input" value={listName} onChange={(e) => setListName(e.target.value)} />

            <p>heroes in list:</p>
            <input id = "hero-list" value={heroList} onChange={(e) => setHeroList(e.target.value)} />

            <p>description</p>
            <input id = "desc-input" value={description} onChange={(e) => setDescription(e.target.value)} />
            <p>visibility: {visibleStatus}</p>
            <div>
              <label className="switch">
                <input type="checkbox" checked={visibility} onChange={handleCheckboxChange} />
                <span className="slider" />
              </label>
              <button id = "create-list-btn" onClick={createNewList}>Submit!</button>
            </div>
          </div>
        </div>
      </div>
      <EditListPopup 
      listName = {currentList ? currentList.listName : ""}
      description = {currentList ? currentList.listDescription : ""}
      visibility = {currentList ? currentList.listVisibility : ""}
      heroes = {currentList ? currentList.listContents : ""}
      editedTime = {currentList ? currentList.editedTime : ""}
      trigger = {addButtonPopup} setTrigger = {setAddButtonPopup}/>
    </div>
  );
}

export default ListManagement;
