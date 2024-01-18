
import { initializeApp, } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCjFgU49b9qNMxsfcJ7mJ6r8zBEANudd_g",
  authDomain: "mobile-auth-8287f.firebaseapp.com",
  projectId: "mobile-auth-8287f",
  storageBucket: "mobile-auth-8287f.appspot.com",
  messagingSenderId: "654885709965",
  appId: "1:654885709965:web:7aff3a5edf49e0e139dac4"
};


const app = initializeApp(firebaseConfig);
export const auth= getAuth(app)
export default app
