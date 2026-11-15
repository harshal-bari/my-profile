import { auth, db } from "./firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { collection, query, orderBy, limit, getDocs } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
$("logoutBtn")?.addEventListener("click",async()=>{await signOut(auth);location.href="index.html";});
function $(id){return document.getElementById(id);}
onAuthStateChanged(auth,async user=>{
 if(!user){location.href="login.html";return;}
 const body=$("leaderboardBody");
 try{const q=query(collection(db,"scores"),orderBy("score","desc"),limit(20));const snap=await getDocs(q);body.innerHTML="";
 if(snap.empty){body.innerHTML="<tr><td colspan='4'>No scores yet. Be the first to play!</td></tr>";return;}
 let rank=0;snap.forEach(d=>{rank++;const x=d.data(),tr=document.createElement("tr");[rank,x.playerName||"Player",x.game||"Game",x.score??0].forEach(v=>{const td=document.createElement("td");td.textContent=v;tr.append(td);});body.append(tr);});
 }catch(e){console.error(e);body.innerHTML="<tr><td colspan='4'>Unable to load leaderboard. Check Firebase setup.</td></tr>";}
});