import firebase from 'firebase';



var firebaseConfig = {
     apiKey: "AIzaSyCqDHPBeC_Zm8f78XQCt9SCJcfWo-6l6Mc",
     authDomain: "login-with-react-ae644.firebaseapp.com",
     databaseURL: "https://login-with-react-ae644.firebaseio.com",
     projectId: "login-with-react-ae644",
     storageBucket: "login-with-react-ae644.appspot.com",
     messagingSenderId: "534456929438",
     appId: "1:534456929438:web:bbb9fd3ea8ced401443f8f"
 };



 // Initialize Firebase
 const fire = firebase.initializeApp(firebaseConfig);


 export default fire;