import './Navigation.css'
import { useNavigate } from 'react-router-dom';

function Navigation() {
  const navigate = useNavigate();
  
  function navTo(selected){
    if (selected === "homepage"){
      navigate('/')
    }
    else if (selected === "login"){
      navigate('/login')
    }
  }

  return (
    <div id = "unauth-navbar">
      <p id = "homepage-link" onClick = {() => {navTo('homepage')}}>homepage</p><p id = "login-text" onClick = {() => {navTo('login')}}>login</p> <p id = "search-text" onClick = {() => {navTo('search')}}>search</p> <p id = "view-public-lists" onClick = {() => {navTo('lists')}}>view public lists</p>
    </div>
  );
}

export default Navigation;
