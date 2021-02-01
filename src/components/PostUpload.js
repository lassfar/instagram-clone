import React, { useState } from 'react';
import '../css/postupload.css';
import firebase from 'firebase';
import { db, storage } from './firebase';

function PostUpload({username}) {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      // set the choosen file not olds (1 or 2..)
      setFile(e.target.files[0]);
    }
  }
  const handleUploadPost = () => {
    // upload the file
    const uploadTask = 
    storage.ref(`media/${file.name}`).put(file);
    // show progress
    uploadTask.on('state_changed', (snapshot) => {
      // progress function
      let progress = Math.round(snapshot.bytesTransferred / snapshot.totalBytes * 100);
      setProgress(progress);
    },
    (error) => {
      console.log(error);
      alert(error.message);
    },
    () => {
      // upload the post
      storage.ref('media')
        .child(file.name)
        .getDownloadURL()
        .then((downloadURL) => {
          db.collection('posts').add({
            username: username,
            profilImg: "https://ssl.gstatic.com/images/branding/product/2x/avatar_circle_grey_512dp.png",
            postImg: downloadURL, // set post url to post
            caption,
            location,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          })
          setProgress(0);
          setCaption("");
          setLocation("");
          setFile(null);
        })
      } 
    );
    
  }

  return (
    <div className="post__upload">
      <progress className="progress" value={progress} max="100" />
      <input type="file" className="file" placeholder="select a picture, video or gif to post" 
        onChange={handleFileChange}
      />
      <textarea className="caption" placeholder="add caption .." onChange={(e) => setCaption(e.target.value)}></textarea>
      <input type="text" className="location" placeholder="Share your location with your friend"
        onChange={(e) => setLocation(e.target.value)} />
      <button className="uploadBtn" onClick={handleUploadPost}>Post</button>
    </div>
  )
}

export default PostUpload
