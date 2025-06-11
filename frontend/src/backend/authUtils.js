// src/backend/authUtils.js
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

// Función para iniciar sesión y obtener el rol del usuario
export const loginWithEmailAndRole = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    const userDocRef = doc(db, "usuarios", uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const data = userDoc.data();
      return { success: true, role: data.rol };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    return { success: false };
  }
};

// Función para registrar un usuario nuevo
export const registerUserWithRole = async (nombre, email, telefono, password, rol = "paciente") => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    await setDoc(doc(db, "usuarios", uid), {
      nombre,
      email,
      telefono,
      rol,
    });

    return { success: true };
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    return { success: false, error: error.message };
  }
};
