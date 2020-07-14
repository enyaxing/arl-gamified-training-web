import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyA7VMXlpVgBUT8C9dCepe6JCsp1zEDyEek",
    authDomain: "arl-gamified-training-2767b.firebaseapp.com",
    databaseURL: "https://arl-gamified-training-2767b.firebaseio.com",
    projectId: "arl-gamified-training-2767b",
    storageBucket: "arl-gamified-training-2767b.appspot.com",
    messagingSenderId: "695207976540",
    appId: "1:695207976540:web:55070284fb165ed11dd099"
};

const fire = firebase.initializeApp(firebaseConfig);
export default fire; 
