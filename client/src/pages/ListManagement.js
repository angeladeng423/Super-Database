import './ListManagement.css';
import Navigation from '../components/Navigation';
import { useState, useEffect } from 'react';

function ListManagement() {
  const [visibility, setVisibility] = useState(true);
  const [visibleStatus, setVisibleStatus] = useState('Private');
  const [userLists, setUserLists] = useState([]);

  // list creation variables
  const [listName, setListName] = useState('');
  const [heroList, setHeroList] = useState([]);
  const [description, setDescription] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    containsList(); // Call containsList once when the component mounts
  }, []); // Empty dependency array means it runs only on mount and unmount

  function handleCheckboxChange() {
    setVisibility(!visibility);
    setVisibleStatus(visibility ? 'Public' : 'Private');
  }

  async function createNewList() {
    setCurrentTime(new Date());
    const editedTime = currentTime.toLocaleString()
    const token = localStorage.getItem('token');
    const listContents = heroList.split(',').map((hero) => parseInt(hero.trim(), 10));

    await fetch('/heroes/listOfLists', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
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
        containsList();
        console.log(data);
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

  function selectedList() {
    // Implement the logic for handling selected list
  }

  return (
    <div>
      <Navigation />
      <div id="formatting">
        <div id="selected-list"></div>
        <div id="lists-div">
          <div id="lists-of-lists">
            <div>
            {userLists.map((list) => (
                <div>
                    <p key={list.listName}>{list.listName}</p>
                    <p key = {list.listName}>Last Modified: {list.editedTime}</p>
                </div>
              ))}
            </div>
          </div>
          <div id="create-list-div">
            <p>name of list:</p>
            <input value={listName} onChange={(e) => setListName(e.target.value)} />

            <p>heroes in list:</p>
            <input value={heroList} onChange={(e) => setHeroList(e.target.value)} />

            <p>description</p>
            <input value={description} onChange={(e) => setDescription(e.target.value)} />

            <div>
              <p>visibility: {visibleStatus}</p>
              <label className="switch">
                <input type="checkbox" checked={visibility} onChange={handleCheckboxChange} />
                <span className="slider" />
              </label>
              <button onClick={createNewList}>Submit!</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListManagement;
