import './CreateAcc.css'
import Navigation from '../components/Navigation'

function CreateAcc() {
    return (
        <div>
            <Navigation/>
            <div class = "centering-container">
                <div id = "login-container">
                    <p id = "email-text">email:</p>
                    <input id = "email-input" type = "email"></input>
                    <p id = "user-text">username:</p>
                    <input id = "user-input" type = "text"></input>
                    <p id = "pass-text">password:</p>
                    <input id = "pass-input" type = "text"></input>
                    <button id = "submit-btn">create</button>
                </div>
            </div>
        </div>
    );
  }
  
  export default CreateAcc;