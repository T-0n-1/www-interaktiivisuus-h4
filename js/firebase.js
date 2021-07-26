var firebaseConfig = {
    apiKey: "AIzaSyAez3V_PmzNIZPOXFfFu5ohhS5uLEihoTY",
    authDomain: "d3-firebase-f4abb.firebaseapp.com",
    projectId: "d3-firebase-f4abb",
    storageBucket: "d3-firebase-f4abb.appspot.com",
    messagingSenderId: "847650465829",
    appId: "1:847650465829:web:7a3a15d76389725f8e37cc",
    measurementId: "G-R098451P0B"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const db = firebase.firestore()