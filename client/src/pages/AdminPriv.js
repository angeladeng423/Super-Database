import './AdminPriv.css'
import Navigation from '../components/Navigation'
import { useState } from 'react'

function AdminPriv(){
    const [email, setEmail] = useState("")

    async function deactivateUser(){

        await fetch('/authy/new-admin', {
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

    async function createAdmin(){

    }

    return(
        <div>
            <Navigation/>
            <div id = "center-this">
                <p>Enter the email of the user to receive admin privileges:</p>
                <input id = "email-track" placeholder = "Enter email..."></input>
            
                <p>Enter the email of the user you'd like to deactivate:</p>
                <input value = {email} onChange = {(e) => setEmail(e.target.value)} id = "deactivate" placeholder = "Enter email..."></input>
            </div>
        </div>
    )
}

export default AdminPriv