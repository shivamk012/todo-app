import { initializeApp } from 'firebase/app';
import { getFirestore , collection, getDocs } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyDZqPVIqmx23GQ8U7bxwQDjitLnS0hiouw",
  authDomain: "todo-app-ea8b2.firebaseapp.com",
  projectId: "todo-app-ea8b2",
  storageBucket: "todo-app-ea8b2.appspot.com",
  messagingSenderId: "125074249499",
  appId: "1:125074249499:web:12f19762ae29c72f14e5be",
  measurementId: "G-35ZXR1TSJ3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const fs = app.firestore();
const db = getFirestore(app);

export default db


// Get a list of cities from your database
// async function getCities(db) {
//   const citiesCol = collection(db, 'cities');
//   const citySnapshot = await getDocs(citiesCol);
//   const cityList = citySnapshot.docs.map(doc => doc.data());
//   return cityList;
// }