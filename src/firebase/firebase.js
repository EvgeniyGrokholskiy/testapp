import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

const firebaseConfig = {
    apiKey: "AIzaSyDTLstUk3KREK9GfCM4uh-cMVQxnQjLkrk",
    authDomain: "web-pack-product-test.firebaseapp.com",
    projectId: "web-pack-product-test",
    storageBucket: "web-pack-product-test.appspot.com",
    messagingSenderId: "384860722185",
    appId: "1:384860722185:web:451e0345c2ab444294d4d8"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getEmail(db) {
    const email = collection(db, 'email');
    const emailFromFireBase = await getDocs(email);
    //const cityList = citySnapshot.docs.map(doc => doc.data());
    return emailFromFireBase;
}

async function getPassword(db) {
    const email = collection(db, 'email');
    const emailFromFireBase = await getDocs(email);
    //const cityList = citySnapshot.docs.map(doc => doc.data());
    return emailFromFireBase;
}