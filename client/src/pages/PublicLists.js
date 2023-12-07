import './PublicLists.css'
import Navigation from '../components/Navigation'
import { useEffect, useState } from 'react'; 

function PublicLists() {
  const [ publicLists, setPublicList ] = useState()
  
  useEffect(() =>{
    getLists()
    console.log(publicLists)
  }, [])

  async function getLists(){
    await fetch('/heroes/list/recent')
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
        setPublicList(data)
    });
  }

    return (
      <div>
        <Navigation/>
        <div id = "center-div">
          <p>public lists for viewing!</p>
          <div id="public-lists">
          {publicLists.map((pubList, index) => (
            <div key={index} className="public-list-item">
              <p>List Name: {pubList.listName}</p>
              <p>List Contents: {pubList.listContents}</p>
              <p>Rating: {pubList.rating}</p>
            </div>
          ))}
        </div>
        </div>
      </div>
    );
  }
  
  export default PublicLists;