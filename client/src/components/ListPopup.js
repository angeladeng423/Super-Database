import React from "react";
import './ListPopup.css';
import { useState, useEffect } from "react";

function ListPopup(props) {
    const [buttonClick, setButtonClick] = useState(false)
    const [showHeroClick, setShowHeroClick] = useState(false)
    const [reviewRating, setReviewRating] = useState("")
    const [reviewComment, setReviewComment] = useState("")
    const [currentInfo, setCurrentInfo ] = useState([])
    const [username, setUsername] = useState()
    const [date, setDate] = useState(new Date())
    const [reviewBtn, setReviewBtn] = useState(false)
    const [reviewInfo, setReviewInfo] = useState([])

    useEffect(() => {
        findHeroes()
        findUsername()
        getReviews()
    }, [props])

    const loggedIn = localStorage.getItem('token');

    async function findUsername(){
        const token = loggedIn
        await fetch('/authy/token/list/user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              token
            }),
          })
          .then((res) => res.json())
          .then((data) => {
            setUsername(data)
          })
    }

    async function getReviews(){
        await fetch(`/heroes/retrieve/${props.list.listID}`)
        .then((res) => res.json())
        .then((data) => {
            setReviewInfo(data)
        })
    }

    async function updateListReviews(rating){
        await fetch (`/heroes/add-review-list/${props.list.listID}/${rating}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
        })
    }
    
    async function createReview(){
        const listID = props.list.listID
        const comment = reviewComment
        const rating = reviewRating
        setDate(new Date())
        const creationDate = date.toLocaleString()
        await fetch('/heroes/create-review', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                listID,
                comment,
                rating,
                username,
                creationDate
            }),
          })
          .then((res) => res.json())
          .then((data) => {
            updateListReviews(rating)
            console.log(data)
          })
    }

    async function findHeroes(){
        const token = props.list.ownerToken
        const selected = props.list.listName

        await fetch('/heroes/list/hero-info', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token,
            selected
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            const list = [];
            for(let i = 0; i < data.length; i++){
              const extractedFields = {
                id: data[i]._doc.id,
                name: data[i]._doc.name,
                publisher: data[i]._doc.Publisher
              };
          
              list.push(extractedFields);
            }

            setCurrentInfo(list)
          });
      }

    return props.trigger ? (
    <div id="popup">
      <div id="bckgrnd">
        <div id="edit-cont">
            <p>List Details</p>
                <button onClick = {() => {setButtonClick(!buttonClick)}}>Expand List Info!</button>
                <div>{buttonClick ? <div>
                    <p>Description: {props.list.listDescription}</p>
                    <p>Heroes: {props.list.listContents.map((hero, index) => (
                    <span key={index}>{hero.trim()}, </span>
                    ))}</p>
                    <button onClick={() => {setShowHeroClick(!showHeroClick)}}>Show hero info!</button>
                    <div id = "hero-in-list-container">{showHeroClick ? <div>
                        {currentInfo.map((hero, index) => (
                            <span key={index}>
                                <p>ID: {hero.id}</p>
                                <p>Name: {hero.name}</p>
                                <p>Publisher: {hero.publisher}</p>
                            </span>
                        ))}
                    </div> : <p></p>}</div>
                </div> : ""}</div>
            <br/><button onClick = {() => {setReviewBtn(!reviewBtn)}}>Reviews</button>
            <div id = "reviewCont">{reviewBtn ? <div>
                {reviewInfo.map((rev, index) => (
                <span key={index}>
                    <p>User: {rev.username}</p>
                    <p>Rating: {rev.rating}</p>
                    <span>{rev.comment ? <p>Comment: {rev.comment}</p> : ""}</span>
                </span>
            ))}
            </div> : ""}</div>
            {loggedIn ? (
            <div>
              <p>Leave a review!</p>
              <p>Enter a rating out of 5:</p>
              <input value = {reviewRating} onChange={(e) => (setReviewRating(e.target.value))}></input>
              <p>Enter a comment</p>
              <input value = {reviewComment} onChange={(e) => (setReviewComment(e.target.value))}></input>
              <br/><button onClick = {() =>
            {
                if(reviewRating <= 5){
                    createReview()
                    setReviewComment("")
                    setReviewRating("")
                    props.setTrigger(false)
                } else {
                    alert("Please enter a valid review rating.")
                }
            }}>Submit!</button>
            </div>
            ) : null}
          <button id="close-btn" onClick={() => {
            setReviewComment("")
            setReviewRating("")
            props.setTrigger(false)}}>Close</button>
        </div>
      </div>
    </div>
  ) : null;
}

export default ListPopup;
