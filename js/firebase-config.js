// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwFfzABYSTgiCv51OlExvROgZcvOT8BKo",
  authDomain: "digital-marketplace-c18a0.firebaseapp.com",
  projectId: "digital-marketplace-c18a0",
  storageBucket: "digital-marketplace-c18a0.firebasestorage.app",
  messagingSenderId: "364884582015",
  appId: "1:364884582015:web:e86c9434323d2505f3a94a",
  measurementId: "G-7MPLRMC2ZM"
};

// Initialize Firebase with compat version
firebase.initializeApp(firebaseConfig);

// Initialize services
const auth = firebase.auth();
const db = firebase.firestore();

// Verify Firebase connection
console.log('Firebase SDK loaded successfully');

// Test authentication state
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log('User is signed in:', user.email);
  } else {
    console.log('No user is signed in');
  }
});
