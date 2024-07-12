import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDeCt8qgqNsTFIh30zvUD_9ZhQNvSNdi68",
  authDomain: "signup-33c21.firebaseapp.com",
  projectId: "signup-33c21",
  storageBucket: "signup-33c21.appspot.com",
  messagingSenderId: "335782128756",
  appId: "1:335782128756:web:fc5e9b2806009f49893521",
  measurementId: "G-LJ1582GJYH"
}

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export{firebase};

