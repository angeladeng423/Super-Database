import './Navigation.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Navigation() {
  const navigate = useNavigate();
  const [adminStatus, setAdminStatus] = useState(false);

  useEffect(() => {
    findAdminStatus();
  }, []);

  // navigate to specific pages
  function navTo(selected) {
    if (selected === "homepage") {
      navigate('/');
    } else if (selected === "lists") {
      navigate('/public-lists');
    } else if (selected === "login") {
      loginStatus() ? logout() : navigate('login');
    } else if (selected === "admin-priv"){
      navigate('/admin-priv')
    } else if (selected === "manage-lists"){
      navigate('/list-manage')
    }
  }

  // determines whether the user is logged in based on the jwt token
  function loginStatus() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  // determines whether the user is an admin
  // based on this, displays a particular nav bar
    async function findAdminStatus() {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await fetch('/authy/token/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token,
          }),
        });

        const data = await response.json();

        if (data === 'admin') {
          setAdminStatus(true);
          localStorage.setItem('admin', 'isAdmin')
        } else {
          setAdminStatus(false);
        }
      }
    } catch (err) {
      console.error('Error finding admin status:', err);
    }
  }

  // logout feature
  function logout() {
    localStorage.removeItem('token');
    navigate('/');
  }

  return (
    <div id="unauth-navbar">
      <p id="homepage-link" onClick={() => { navTo('homepage') }}>homepage</p>
      <p id="login-text" onClick={() => { navTo('login') }}>{loginStatus() ? 'logout' : 'login'}</p>
      <p id="view-public-lists" onClick={() => { navTo('lists') }}>view public lists</p>
      <p id="manage-my-lists" onClick = {() => { navTo('manage-lists')}}>{loginStatus() ? "manage my lists" : ""}</p>
      {loginStatus() && adminStatus && <p onClick = {() => {navTo('admin-priv')}} id="admin-priv">admin privileges</p>}
    </div>
  );
}

export default Navigation;
