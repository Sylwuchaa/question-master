import * as firebase from 'firebase';
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDSyAsDYe0q2nvngtMva4xIq8XUc5ysjr4",
  authDomain: "question-master-6d921.firebaseapp.com",
  databaseURL: "https://question-master-6d921.firebaseio.com",
  projectId: "question-master-6d921",
  storageBucket: "question-master-6d921.appspot.com",
  messagingSenderId: "981669439824",
  appId: "1:981669439824:web:ad1fa8387767f984292455",
  measurementId: "G-29P989GZYP"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();