import './AdminPriv.css'
import Navigation from '../components/Navigation'
import { useState } from 'react'

function AdminPriv(){
    // set up state variables
    const [email, setEmail] = useState("")
    const [deactivateEmail, setDeactivateEmail] = useState("")
    const [reactivateEmail, setReactivateEmail] = useState("")

    // allows admin to deactivate user
    async function deactivateUser(){
        await fetch('/authy/register/deactivate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                deactivateEmail,
            })
        })
        .then((res) => res.json())
        .then((data) => {
            alert("Successfully deactivated.")
        })
    }

    // allows the setting an additional user as admin
    async function createAdmin(){
        console.log(email)
        await fetch('/authy/register/new-admin', {
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
            alert("Successfully created new admin.")
        })
    }

    // reactivates deactivated accounts
    async function reactivate(){
        console.log(reactivateEmail)
        await fetch('/authy/register/reactivate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                reactivateEmail,
            })
        })
        .then((res) => res.json())
        .then((data) => {
            alert("Successfully reactivated accunt.")
        })
    }

    return(
        <div>
            <Navigation/>
            <div id = "center-this">
                <p>Enter the email of the user to receive admin privileges:</p>
                <input value = {email} onChange = {(e) => setEmail(e.target.value)} id = "email-track" placeholder = "Enter email..."></input>
                <button onClick = {createAdmin} id = "sub-btn">Submit!</button>

                <p>Enter the email of the user you'd like to deactivate:</p>
                <input value = {deactivateEmail} onChange = {(e) => setDeactivateEmail(e.target.value)} id = "deactivate" placeholder = "Enter email..."></input>
                <button onClick = {deactivateUser} id = "sub-btn">Submit!</button>
            
                <p>Enter the email of the user you'd like to reactivate:</p>
                <input value = {reactivateEmail} onChange = {(e) => setReactivateEmail(e.target.value)} id = "deactivate" placeholder = "Enter email..."></input>
                <button onClick = {reactivate} id = "sub-btn">Submit!</button>
            </div>
        </div>
    )
}

export default AdminPriv