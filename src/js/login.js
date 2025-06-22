import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
// import { updateUserUI } from "./header";

// function updateUserUI(user) {
//   if (!user) return;

//   userName.textContent = user.displayName || "Anonim";
//   listUser.style.display = "flex";
//   list.style.display = "none";
// }

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("👤 Текущий пользователь:", user);
    // updateUserUI(user);
  } else {
    // listUser.style.display = "none";
    // list.style.display = "flex";

    console.log("🔒 Пользователь вышел");
  }
});

async function login(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;
    // await user.reload();
    // updateUserUI(user);
    console.log("Logged in:", user);
  } catch (error) {
    // const errorCode = error.code;
    // const errorMessage = error.message;
    console.error("Login error:", error.code, error.message);
  }
}

export { login };
