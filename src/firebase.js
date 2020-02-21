import firebase from "firebase/app"

const firebaseConfig = {
  apiKey: "AIzaSyDrMQJASkZxLYg8QhUSo-5ahAMYBOIzJYM",
  authDomain: "cse170-openbook.firebaseapp.com",
  databaseURL: "https://cse170-openbook.firebaseio.com",
  projectId: "cse170-openbook",
  storageBucket: "cse170-openbook.appspot.com",
  messagingSenderId: "669786581098",
  appId: "1:669786581098:web:865af162877b94c1a8c213",
  measurementId: "G-V1E8KXRJY5",
}

export const fb = firebase.initializeApp(firebaseConfig) // Firebase App

export const db = firebase.firestore() // Firestore database
