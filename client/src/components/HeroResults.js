import './HeroResults.css';
import { useState, useEffect } from 'react';

function HeroResults() {
    const [heroMatches, setHeroMatches] = useState([]);
    const [raceSearch, setRaceSearch] = useState("null");
    const [nameSearch, setNameSearch] = useState("null");
    const [powerSearch, setPowerSearch] = useState("null");
    const [publisherSearch, setPublisherSearch] = useState("null");
    const [expandedPhysical, setExpandedPhysical] = useState([]);
    const [expandedPowers, setExpandedPowers] = useState([]);

    const handleExpandPhysical = (index) => {
        const newExpandedPhysical = [...expandedPhysical];
        newExpandedPhysical[index] = !newExpandedPhysical[index];
        setExpandedPhysical(newExpandedPhysical);
    };

    const handleExpandPowers = (index) => {
        const newExpandedPowers = [...expandedPowers];
        newExpandedPowers[index] = !newExpandedPowers[index];
        setExpandedPowers(newExpandedPowers);
    };

    useEffect(() => {
        console.log(`/heroes/heroSearch/${raceSearch}/${nameSearch}/${powerSearch}/${publisherSearch}`);
        fetch(`/heroes/heroSearch/${raceSearch}/${nameSearch}/${powerSearch}/${publisherSearch}`)
            .then((res) => res.json())
            .then((data) => {
            setHeroMatches(data);
            
            setExpandedPowers(Array(data.length).fill(false));
            setExpandedPhysical(Array(data.length).fill(false));
        });
    }, [raceSearch, nameSearch, powerSearch, publisherSearch]);

    return (
        <div id="hero-results">
            <div className="line"></div>
        <p id="searchby">search by the following!</p>
        <div id="search-bar">
        <input
            value={raceSearch}
            onChange={(e) => setRaceSearch(e.target.value)}
            id="race-input"
            placeholder="race..."
        ></input>
        <input
            value={nameSearch}
            onChange={(e) => setNameSearch(e.target.value)}
            id="name-input"
            placeholder="name..."
        ></input>
        <input
            value={powerSearch}
            onChange={(e) => setPowerSearch(e.target.value)}
            id="power-input"
            placeholder="power..."
        ></input>
        <input
            value={publisherSearch}
            onChange={(e) => setPublisherSearch(e.target.value)}
            id="publisher-input"
            placeholder="publisher..."
        ></input>
        </div>
        <ol id="matches-list">
            {heroMatches.length > 0 ? (
            heroMatches.map((hero, index) => (
            <li key={index}>
                Name: {hero.name} <br />
                Publisher: {hero.Publisher} <br />
                <div className="dropdown">
                    <button id="expand-info">Want more info?</button>
                    <div className="dropdown-content">
                    <p onClick={() => handleExpandPowers(index)} id="powers">
                    {expandedPowers[index] ? 'Hide' : 'Expand'} powers!</p>
                    <p onClick={() => handleExpandPhysical(index)} id="physical">
                    {expandedPhysical[index] ? 'Hide' : 'Expand'} physical description!</p>
                </div>
                </div>
                {expandedPowers[index] && <p>This is the additional power description.</p>}
                {expandedPhysical[index] && <p>Alignment: {hero.Alignment} <br/>
                Gender: {hero.Gender}<br/>
                Race: {hero.Race}<br/>
                Weight: {hero.Weight}<br/>
                Height: {hero.Height}<br/>
                Hair Colour: {hero.hairColor}<br/>
                Skin Color: {hero.skinColor}<br/>
                Eye Color: {hero.eyeColor}
                </p>}
            </li>
          ))
        ) : (
          <li>Your Hero Matches Appear Here!</li>
        )}
            </ol>
        </div>
    );
}

export default HeroResults;
