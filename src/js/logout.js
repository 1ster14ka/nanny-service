import { signOut } from "firebase/auth";
import { auth } from "./firebase";

async function logout() {
  try {
    await signOut(auth);

    console.log("logout,");
  } catch (error) {
    // const errorCode = error.code;
    // const errorMessage = error.message;
    console.error("Logout error:", error.code, error.message);
  }
}

export { logout };
