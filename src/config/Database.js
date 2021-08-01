import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyBLURnNlnzrrRdHwf3I6rhdes3ErAYZ1io",
    authDomain: "salesboom-1114a.firebaseapp.com",
    databaseURL: "https://salesboom-1114a-default-rtdb.firebaseio.com",
    projectId: "salesboom-1114a",
    storageBucket: "salesboom-1114a.appspot.com",
    messagingSenderId: "1056991156692",
    appId: "1:1056991156692:web:376674e7f44592dbe65e41",
    measurementId: "G-QMMJNNV60K"
};
const Database = firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export default Database;
