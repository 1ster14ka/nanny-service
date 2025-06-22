import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { updateUserUI } from "./header";

async function login(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;
    await user.reload();
    updateUserUI(user);
    console.log("Logged in:", user);
  } catch (error) {
    // const errorCode = error.code;
    // const errorMessage = error.message;
    console.error("Login error:", error.code, error.message);
  }
}

export { login };
