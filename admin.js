import { auth } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
const status=document.getElementById("adminStatus");
onAuthStateChanged(auth,async user=>{
 if(!user){location.href="login.html";return;}
 try{const token=await user.getIdTokenResult(true);if(token.claims.admin===true){status.textContent="Admin access verified. Admin tools can be connected to a trusted backend.";status.style.color="#42e8ff";}
 else{status.textContent="Access denied. This account does not have the admin claim.";status.style.color="#ff8295";}}
 catch(e){status.textContent="Could not verify admin access.";status.style.color="#ff8295";}
});