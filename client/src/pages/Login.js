import './Login.css'
import Navigation from '../components/Navigation'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'

// admin password: admin123

function Login() {
    const navigate = useNavigate();

    // determines constants
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showResend, setShowResend] = useState(false)

    function navTo(){
        navigate('/create-account')
    }

    // allows user to access backend to login
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
                console.log(data)
                if(data.status !== null){
                    // based on what is returned, alerts the following
                    if(data.status.verified === "deactivated"){
                        alert("Your account has been deactivate. Please contact the admin with the email 'se3316adeng32@gmail.com'")
                    } else if(data.status.verified === 'verified' || data.status.verified === 'admin'){
                        alert('Login success!')

                        // stores jwt token, which facilitates access to authenticated features
                        localStorage.setItem('token', data.status.verificationToken)
                        navigate('/')
                    } else if (data.status.verified === 'unverified') {
                        alert('Please verify your email!')
                        setShowResend(true)
                    } else if (data.status === 'not matching'){
                        alert("Please retry with your correct email and password.")
                    }
                } else {
                    alert ('Please enter existing email and password')
                }
            });
    } 

    // resend verification email feature
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
                    {showResend ? <p id = "resend-btn" onClick = {resend}>resend verification!</p> : ""}
                    <p onClick = {() => navigate('/policy')}>click to view our policies</p>
                </div>
            </div>

        </div>
    );
  }
  
  export default Login;