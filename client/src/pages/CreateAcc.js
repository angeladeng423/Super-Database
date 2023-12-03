import './CreateAcc.css'
import Navigation from '../components/Navigation'
import { useState } from 'react'

function CreateAcc() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function registerUser(event) {
        await fetch('/authy/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                email,
                password,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
            });
    }    

    return (
        <div>
            <Navigation/>
            <div className = "centering-container">
                <div id = "login-container">
                    <p id = "email-text">email:</p>
                    <input value = {email} onChange = {(e) => setEmail(e.target.value)} id = "email-input" type = "email"></input>
                    <p id = "user-text">username:</p>
                    <input value = {username} onChange = {(e) => setUsername(e.target.value)} id = "user-input" type = "text"></input>
                    <p id = "pass-text">password:</p>
                    <input value = {password} onChange = {(e) => setPassword(e.target.value)} id = "pass-input" type = "text"></input>
                    <button onClick = {() => {
                        registerUser()
                    }} id = "submit-btn">create</button>
                </div>
            </div>
        </div>
    );
  }
  
  export default CreateAcc;