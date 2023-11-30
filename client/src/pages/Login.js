import './Login.css'
import Navigation from '../components/Navigation'
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
  
    function navTo(){
        navigate('/create-account')
    }

    return (
        <div>
            <Navigation/>
            <div class = "centering-container">
                <div id = "login-container">
                    <p id = "user-text">username:</p>
                    <input id = "user-input" type = "text"></input>
                    <p id = "pass-text">password:</p>
                    <input id = "pass-input" type = "text"></input>
                    <button id = "submit-btn">login!</button>
                    <p id = "link-to-new-acc" onClick = {navTo}>or create a new account!</p>
                </div>
            </div>

        </div>
    );
  }
  
  export default Login;