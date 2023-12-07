import React from "react";
import './ListPopup.css';
import { useState } from "react";

function ListPopup(props) {
    const [buttonClick, setButtonClick] = useState(false)
    const [reviewRating, setReviewRating] = useState("")
    const [reviewComment, setReviewComment] = useState("")

    const token = localStorage.getItem('token');

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
                </div> : ""}</div>
            <button>Reviews</button>
            {token ? (
            <div>
              <p>Leave a review!</p>
              <p>Enter a rating out of 5:</p>
              <input value = {reviewRating} onChange={(e) => (setReviewRating(e.target.value))}></input>
              <p>Enter a comment</p>
              <input value = {reviewComment} onChange={(e) => (setReviewComment(e.target.value))}></input>
            </div>
            ) : null}
          <button id="close-btn" onClick={() => props.setTrigger(false)}>Close</button>
        </div>
      </div>
    </div>
  ) : null;
}

export default ListPopup;
