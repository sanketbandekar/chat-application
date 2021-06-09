import firebase from 'firebase/app'
import 'firebase/firebase-auth'
import 'firebase/firebase-database'

const config = {
    apiKey: "AIzaSyCUATlv9NYGeZ3q8eKnixwFqGrMGRp-ZbQ",
    authDomain: "chat-web-app-75314.firebaseapp.com",
    projectId: "chat-web-app-75314",
    storageBucket: "chat-web-app-75314.appspot.com",
    messagingSenderId: "111449163513",
    appId: "1:111449163513:web:1ba72f0f3d95c475e44428",
    databaseURL: "https://chat-web-app-75314-default-rtdb.firebaseio.com/"
};

// eslint-disable-next-line no-unused-vars
const app = firebase.initializeApp(config);

export const auth = app.auth();
export const database = app.database();

