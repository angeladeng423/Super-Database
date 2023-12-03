import './CreateAcc.css'
import Navigation from '../components/Navigation'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function CreateAcc() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const navigate = useNavigate()

    async function registerUser() {
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
                if(data.status === 'ok'){
                    alert("Account created. Please verify your email.")
                    navigate('/login')
                } else {
                    if (data.status.errors) {
                        if (data.status.errors.email) {
                            alert("Email field must not be empty and must be a valid email (contains @).")
                        } else if (data.status.errors.username) {
                            alert("Username field must not be empty.")
                        } else if (data.status.errors.password) {
                            alert("Password field must not be empty.")
                        }
                    } else if (data.status.code === 11000) {
                        alert("Your email must be unique.")
                    }
                }
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