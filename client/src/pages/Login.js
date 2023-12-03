import './Login.css'
import Navigation from '../components/Navigation'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'

function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    function navTo(){
        navigate('/create-account')
    }

    return (
        <div>
            <Navigation/>
            <div className = "centering-container">
                <div id = "login-container">
                    <p id = "user-text">username:</p>
                    <input value = {username} onChange = {(e) => setUsername(e.target.value)} id = "user-input" type = "text"></input>
                    <p id = "pass-text">password:</p>
                    <input value = {password} onChange = {(e) => setPassword(e.target.value)} id = "pass-input" type = "text"></input>
                    <button id = "submit-btn">login!</button>
                    <p id = "link-to-new-acc" onClick = {navTo}>or create a new account!</p>
                </div>
            </div>

        </div>
    );
  }
  
  export default Login;