import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "./firebase";
import { ref, set } from "firebase/database";
import { updateUserUI } from "./header";

async function register(name, email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await set(ref(db, "users/" + user.uid), {
      name,
      email,
      uid: user.uid,
    });
    await updateProfile(user, {
      displayName: name,
    });
    updateUserUI(user);
  } catch (error) {
    console.error("Register error:", error.code, error.message);
    throw new Error(error.message);
  }
}

export { register };
