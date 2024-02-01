import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAHkc35t5lFnFrZ4HpyYj8Pc3zm7BhLolM",
    authDomain: "resumebuilder-70d87.firebaseapp.com",
    projectId: "resumebuilder-70d87",
    storageBucket: "resumebuilder-70d87.appspot.com",
    messagingSenderId: "666165210750",
    appId: "1:666165210750:web:0577ac7ad03e32a919322f",
    measurementId: "G-BQE2SPFFVF"
};

const app = initializeApp(firebaseConfig);
const dataBase = getFirestore(app);
const auth = getAuth(app);

export { dataBase, auth };