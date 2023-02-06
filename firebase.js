// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvB7vTK8Ult9b6Rkyh9XXXoLxDMQ6D64I",
  authDomain: "react-native-ig-clone-f6503.firebaseapp.com",
  projectId: "react-native-ig-clone-f6503",
  storageBucket: "react-native-ig-clone-f6503.appspot.com",
  messagingSenderId: "768465720401",
  appId: "1:768465720401:web:0010c0ed47c8195f291470"
}

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

const db = firebase.firestore()
const storage = firebase.storage()

export { firebase, db, storage }
