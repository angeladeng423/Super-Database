import './App.css';
import FrontImage from '../components/FrontImage';
import Navigation from '../components/Navigation';
// import { useEffect } from 'react'

function App() {
  /*
  EXAMPLE FOR HOW TO ACCESS BACKEND

  useEffect(() => {
    fetch("/heroes")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);*/

  return (
    <div>
      <Navigation/>
      <div id = "styling">
        <FrontImage/>
        <div id = "about-paragraph">
          This is a website developed with a database of hereos as the backend, and numerous user functionalities as the frontend. You are able to view top lists and search for heroes as an anonymous user. Upon logging in, you will receive numerous other functionalities. This project was created for SE3316 Lab 4, by Angela Deng.      </div>
      </div>
    </div>
  );
}

export default App;
