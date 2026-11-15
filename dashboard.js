import { auth, db } from "./firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { collection, query, where, getDocs, orderBy, limit } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
const $=id=>document.getElementById(id);
$("logoutBtn")?.addEventListener("click",async()=>{await signOut(auth);location.href="index.html";});
onAuthStateChanged(auth,async user=>{
 if(!user){location.href="login.html";return;}
 $("playerName").textContent=user.displayName||"Player"; $("playerEmail").textContent=user.email||"";
 try{
  const q=query(collection(db,"scores"),where("userId","==",user.uid));
  const snap=await getDocs(q); let xp=0; snap.forEach(d=>xp+=Number(d.data().score)||0);
  $("totalXp").textContent=xp; $("gamesPlayed").textContent=snap.size;
  const recent=query(collection(db,"scores"),where("userId","==",user.uid),orderBy("createdAt","desc"),limit(5));
  const recentSnap=await getDocs(recent); $("recentScores").innerHTML="<h2>Recent activity</h2>";
  if(recentSnap.empty) $("recentScores").innerHTML+="<p class='muted'>No games played yet. Start your first game!</p>";
  recentSnap.forEach(d=>{const x=d.data();const row=document.createElement("div");row.className="score-row";row.textContent=`${x.game} — ${x.score} XP`; $("recentScores").append(row);});
 }catch(err){console.error(err);$("recentScores").textContent="Could not load scores. Check Firestore setup and indexes.";}
});