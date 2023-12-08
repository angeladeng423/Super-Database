import './App.css';
import FrontImage from '../components/FrontImage';
import Navigation from '../components/Navigation';
import HeroResults from '../components/HeroResults'
import { useState } from 'react';

function App() {
  const [heroName, setHeroName] = useState("")
  const [publisher, setPublisher] = useState("")

  function searchByDDG(){
    const search = encodeURIComponent(heroName+" "+publisher)
    try{
      window.open(`https://duckduckgo.com/${search}`, "blank")
    } catch (err){
      console.log(err)
    }
  }

  return (
    <div>
      <Navigation/>
      <div id = "styling">
        <FrontImage/>
        <div id = "about-paragraph">
          This is a website developed with a database of heroes as the backend, and numerous user functionalities as the frontend. You are able to view top lists and search for heroes as an anonymous user. Upon logging in, you will receive numerous other functionalities. This project was created for SE3316 Lab 4, by Angela Deng.      </div>
      </div>
      <p onClick={searchByDDG}>Click here to search by DDG</p>
      <input value = {heroName} onChange = {(e) => setHeroName(e.target.value)}></input>
      <input value = {publisher} onChange = {(e) => setPublisher(e.target.value)}></input>
      <HeroResults/>
    </div>
  );
}

export default App;
