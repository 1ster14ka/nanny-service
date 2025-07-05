import { signOut } from "firebase/auth";
import { auth } from "./firebase";

async function logout() {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout error:", error.code, error.message);
  }
}

export { logout };
