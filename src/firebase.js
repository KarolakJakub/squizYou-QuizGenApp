import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyBe__9HEd0EQOQF9C7g9DJG1Hyx77KNSVQ",
    authDomain: "ubuntuwnicy-app.firebaseapp.com",
    databaseURL: "https://ubuntuwnicy-app.firebaseio.com",
    projectId: "ubuntuwnicy-app",
    storageBucket: "ubuntuwnicy-app.appspot.com",
    messagingSenderId: "772708926714",
    appId: "1:772708926714:web:7634be5fa43f6f98"
};
// Initialize Firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig);