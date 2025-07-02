import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyD1koMFwBckChOI8Q5IGnDFea7Ph7CxR-A",
    authDomain: "goalforge-ai-55567.firebaseapp.com",
    projectId: "goalforge-ai-55567",
    storageBucket: "goalforge-ai-55567.firebasestorage.app",
    messagingSenderId: "834221943147",
    appId: "1:834221943147:web:60a1125df4b5ce88ae042e",
    measurementId: "G-C2ZM2TEZE6"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider }; 