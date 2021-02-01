import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/post.css';
import { db } from './firebase';
import firebase from 'firebase';


function Post({postId, user, username, profilImg, location, postImg, caption}) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db.collection('posts').doc(postId)
        .collection('comments').orderBy('timestamp', 'desc').onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    
    console.log("comments : ", comments)
    return () => {
      unsubscribe();
    }
  }, [postId]);

  const handlePostComment = (e) => {
    e.preventDefault();
    db.collection('posts').doc(postId).collection('comments').add({
      text: comment, username: user.displayName, timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    setComment("");
  }

  return (
    <div className="post">
      <div className="post__header">
        <img src={profilImg} className="post__profilImg" alt="post img" />
        <div className="post__headerInfo">
          <span className="post__owner">{username}</span>
          <small className="post__location">{location}</small>
        </div>
        <Link to="#" className="post__moreBtn">
          <i className="material-icons">more_horiz</i>
        </Link>
      </div>
      <img className="post__img"
        src={postImg}
        alt="picture's post" />
      <div className="post__content">
        <div className="post__react">
          <div>
            <Link className="post__reactItem" to="#">
              <i className="material-icons">favorite_border</i>
            </Link>
            <Link className="post__reactItem" to="#">
              <i className="material-icons">chat_bubble_outline</i>
            </Link>
            <Link className="post__reactItem" to="#">
              <i className="material-icons">send</i>
            </Link>
          </div>
          <Link className="post__reactItem" to="#">
            <i className="material-icons">bookmark_border</i>
          </Link>
        </div>
        <div className="post__caption">
          <small className="post__owner">{username}</small>
          <small>{caption}</small>
        </div>
      </div>
      <div className="post__footer">
        <div className="post__comments">
          {/* <div className="post__comment">
            <small className="owner">soumia</small>
            <small className="comment">beautifull babe</small>
          </div> */}
          {
            comments.map((comment) => (
              <div className="post__comment" key={comment.id}>
                <small className="owner">{comment.username}</small>
                <small className="comment">{comment.text}</small>
              </div>
            ))
          }

        </div>

        {/* write a comment */}
        <div className="post__formComment">
          <input type="text" onChange={ (e) => setComment(e.target.value) } value={comment}
            className="post__commentInput" placeholder="Add a comment" />
          <Link to="#" className="post__commentBtn" onClick={handlePostComment}>Post</Link>
        </div>
        
      </div>

    </div>
  )
}

export default Post
