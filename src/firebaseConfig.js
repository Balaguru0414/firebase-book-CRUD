import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCmTNTZxa5BDJI8P6-sbOvUf4086okG0ng",
  authDomain: "book-db-b82ef.firebaseapp.com",
  projectId: "book-db-b82ef",
  storageBucket: "book-db-b82ef.appspot.com",
  messagingSenderId: "187940059307",
  appId: "1:187940059307:web:db7c91a92d6c9530455fee",
  measurementId: "G-4D4P69QXV1"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
