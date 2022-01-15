import firebase from '@firebase/app';
import "firebase/firestore";
import {useHistory} from 'react-router-dom';
require('firebase/auth');


const firebaseConfig = {
  
};

firebase.initializeApp(firebaseConfig);

const auth=firebase.auth();
const db=firebase.firestore();

const googleProvider = new firebase.auth.GoogleAuthProvider();


const signInWithEmailAndPassword = async (email, password) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

const registerWithEmailAndPassword = async (email, password) => {
    try {
      const res = await auth.createUserWithEmailAndPassword(email, password);
      const user = res.user;
      await db.collection("users").add({
        uid: user.uid,
        authProvider: "local",
        email,
      });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

export {auth,registerWithEmailAndPassword,signInWithEmailAndPassword,db,googleProvider,firebase};

