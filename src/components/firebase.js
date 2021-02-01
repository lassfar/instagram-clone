import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB21-FdLY1fXakM2DOKV0ifWFnOdHBMJLM",
  authDomain: "instagram-clone-93685.firebaseapp.com",
  databaseURL: "https://instagram-clone-93685.firebaseio.com",
  projectId: "instagram-clone-93685",
  storageBucket: "instagram-clone-93685.appspot.com",
  messagingSenderId: "337203276462",
  appId: "1:337203276462:web:82328cca975fc0b7cfdb3f",
  measurementId: "G-8QMEV4TDK1"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage =  firebaseApp.storage();

export { db, auth, storage };