import React, { useEffect, useState } from 'react';
import Post from './Post';
import { db } from './firebase';
import { Redirect } from 'react-router-dom';
import PostUpload from './PostUpload';
import InstagramEmbed from 'react-instagram-embed';

function Home({user}) {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setPosts(
        snapshot.docs.map(doc => ({
          id: doc.id,
          post: doc.data()
        }))
      ); //setposts
    }) //snapshot (listener)
  }, []);

  if (user) {
    return (
      <div className="home">
        <Redirect to="/" />
        <PostUpload username={user.displayName} />
        {
          // access keys inside posts state : ({post, id})
          posts.map(({post, id}) => (
            <Post key={id}
              postId={id}
              user={user}
              username={post.username}
              profilImg={post.profilImg}
              location={post.location}
              postImg={post.postImg}
              caption={post.caption} />
          ))
        }
        <InstagramEmbed
          url='https://www.instagram.com/p/B-8T0pSpsEa/'
          maxWidth={320}
          hideCaption={false}
          containerTagName='div'
          protocol=''
          injectScript
          onLoading={() => {}}
          onSuccess={() => {}}
          onAfterRender={() => {}}
          onFailure={() => {}}
        />
      </div>
    )
  } else {
    return (
      <Redirect to="/signin" />
    )
  }
}

export default Home
