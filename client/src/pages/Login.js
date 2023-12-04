import './Login.css'
import Navigation from '../components/Navigation'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showResend, setShowResend] = useState(false)

    function navTo(){
        navigate('/create-account')
    }

    async function loginUser() {
        await fetch('/authy/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data.status)
                if(data.status !== null){
                    if(data.status.verified === 'verified'){
                        alert('Login success!')
                        localStorage.setItem('token', data.status.verificationToken)
                        navigate('/')
                    } else {
                        alert('Please verify your email!')
                        setShowResend(true)
                    }
                } else {
                    alert ('Please enter existing email and password')
                }
            });
    } 

    async function resend(){
        await fetch ('/authy/resend', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
            })
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
        })
    }

    return (
        <div>
            <Navigation/>
            <div className = "centering-container">
                <div id = "login-container">
                    <p id = "user-text">email:</p>
                    <input value = {email} onChange = {(e) => setEmail(e.target.value)} id = "user-input" type = "text"></input>
                    <p id = "pass-text">password:</p>
                    <input value = {password} onChange = {(e) => setPassword(e.target.value)} id = "pass-input" type = "text"></input>
                    <button onClick = {() => {
                        loginUser()
                    }} id = "submit-btn">login!</button>
                    <p id = "link-to-new-acc" onClick = {navTo}> create a new account!</p>
                    {showResend ? <p id = "resend-btn" onClick = {resend}>resend verification!</p> : (console.log("test"))}
                </div>
            </div>

        </div>
    );
  }
  
  export default Login;