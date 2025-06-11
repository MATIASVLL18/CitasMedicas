import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Importa Firestore

const firebaseConfig = {
  apiKey: "AIzaSyCFPIzMUzQVVwkbYHA3xNx73oLQ0r1Boa0",
  authDomain: "citasmedicas-e431b.firebaseapp.com",
  projectId: "citasmedicas-e431b",
  storageBucket: "citasmedicas-e431b.appspot.com",
  messagingSenderId: "309037055197",
  appId: "1:309037055197:web:08328f7d13c1c0c8f2ef34",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app); //  Inicializa Firestore

export { auth, db }; // 
