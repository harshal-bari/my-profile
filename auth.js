import { auth, db } from "./firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const loginForm = document.querySelector("#loginForm");
const signupForm = document.querySelector("#signupForm");
const message = document.querySelector("#message");
const show = (text, error=false) => { if(message){ message.textContent=text; message.style.color=error?"#ff8295":"#42e8ff"; } };

if (signupForm) signupForm.addEventListener("submit", async (e) => {
  e.preventDefault(); const name=document.querySelector("#name").value.trim();
  const email=document.querySelector("#email").value.trim(); const password=document.querySelector("#password").value;
  try {
    const result=await createUserWithEmailAndPassword(auth,email,password);
    await updateProfile(result.user,{displayName:name});
    await setDoc(doc(db,"users",result.user.uid),{displayName:name,email,createdAt:serverTimestamp(),totalXp:0});
    location.href="dashboard.html";
  } catch(err){ show(err.message,true); }
});
if (loginForm) loginForm.addEventListener("submit", async (e) => {
  e.preventDefault(); const email=document.querySelector("#email").value.trim(); const password=document.querySelector("#password").value;
  try { await signInWithEmailAndPassword(auth,email,password); location.href="dashboard.html"; }
  catch(err){ show(err.message,true); }
});
if (location.pathname.endsWith("login.html") || location.pathname.endsWith("signup.html")) {
  onAuthStateChanged(auth,user=>{ if(user) location.href="dashboard.html"; });
}
