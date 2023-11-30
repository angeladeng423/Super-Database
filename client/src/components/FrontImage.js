import './FrontImage.css'
import speedImage from './images/speed.png'

function FrontImage() {
  return (
    <div id = "container">
        <div id = "image-container">
            <img src = {speedImage} alt = "coverpage"/>

            <div id = "text-container">
                <p id = "front-page-text">Superhero?</p> <p id = "second-text">Super Database.</p>
                <div className = "fading-effect"></div>
            </div>
        </div>
    </div>
  );
}

export default FrontImage;
