import './Navigation.css'
import { useNavigate } from 'react-router-dom';

function Navigation() {
  const navigate = useNavigate();
  
  function navTo(selected){
    if (selected === "homepage"){
      navigate('/')
    } else if(selected === "lists"){
      navigate('/public-lists')
    } else if (selected === "login"){
      loginStatus() ? logout() : navigate('login')
    }
  }

  function loginStatus(){
    const token = localStorage.getItem('token');
    return !!token;
  }

  function logout(){
    localStorage.removeItem('token');
    navigate('/')
  }

  return (
    <div id = "unauth-navbar">
      <p id = "homepage-link" onClick = {() => {navTo('homepage')}}>homepage</p><p id = "login-text" onClick = {() => {navTo('login')}}>{loginStatus() ? 'logout' : 'login'}</p> <p id = "search-text" onClick = {() => {navTo('search')}}>search by ddg</p> <p id = "view-public-lists" onClick = {() => {navTo('lists')}}>view public lists</p>
    </div>
  );
}

export default Navigation;
