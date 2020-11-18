import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyAWBzw6Q0l5OXE8zKo1s_U9Y5ndKytrDuw",
	authDomain: "todolist-7211d.firebaseapp.com",
	databaseURL: "https://todolist-7211d.firebaseio.com",
	projectId: "todolist-7211d",
	storageBucket: "todolist-7211d.appspot.com",
	messagingSenderId: "867223218154",
	appId: "1:867223218154:web:43275bcf76abc854a13493",
	measurementId: "G-36WVTDNMQR",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

export default db;
