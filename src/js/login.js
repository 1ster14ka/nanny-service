import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

async function login(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;
  } catch (error) {
    throw new Error(error.message);
  }
}

export { login };
