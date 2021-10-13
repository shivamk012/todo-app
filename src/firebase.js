import firebase from 'firebase'
import 'firebase/firestore'

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
const app = firebase.initializeApp(firebaseConfig);
const firestore = app.firestore();

firestore.settings({timestampsInSnapshots : true});

const analytics = getAnalytics(app);

export default firestore