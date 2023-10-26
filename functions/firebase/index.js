import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {

    apiKey: "AIzaSyA1aPqjHTrPxoFlVxF-lLiAI3cy2i3SR5k",
    authDomain: "maher-vue.firebaseapp.com",
    databaseURL: "https://maher-vue-default-rtdb.firebaseio.com",
    projectId: "maher-vue",
    storageBucket: "maher-vue.appspot.com",
    messagingSenderId: "694861415607",
    appId: "1:694861415607:web:269a6d6a8d2d4b755c7932",
  



};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firestoreDatabase = getFirestore(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage =getStorage(app);

export default firestoreDatabase;