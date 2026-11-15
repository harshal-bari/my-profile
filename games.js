import { auth, db } from "./firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { addDoc, collection, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
const $=id=>document.getElementById(id); let player=null;
onAuthStateChanged(auth,u=>{if(!u){location.href="login.html";return;}player=u;});
$("logoutBtn")?.addEventListener("click",async()=>{await signOut(auth);location.href="index.html";});
async function saveScore(game,score){
 if(!player){$("gameMessage").textContent="Please wait for account verification, then try again.";return;}
 try{await addDoc(collection(db,"scores"),{userId:player.uid,playerName:player.displayName||"Player",game,score,createdAt:serverTimestamp()});$("gameMessage").textContent=`${game}: ${score} XP saved!`;}
 catch(e){$("gameMessage").textContent="Score could not be saved. Check Firebase configuration.";console.error(e);}
}
// Tic Tac Toe
let board=Array(9).fill(""),turn="X",done=false;
const wins=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
function drawTtt(){const el=$("tttBoard");if(!el)return;el.innerHTML="";board.forEach((v,i)=>{const b=document.createElement("button");b.className="ttt-cell";b.textContent=v;b.addEventListener("click",()=>move(i));el.append(b);});}
function move(i){if(board[i]||done)return;board[i]=turn;drawTtt();const won=wins.some(w=>w.every(n=>board[n]===turn));if(won){done=true;$("tttStatus").textContent=`${turn} wins!`;if(turn==="X")saveScore("Tic Tac Toe",10);return;}if(board.every(Boolean)){done=true;$("tttStatus").textContent="Draw!";return;}turn=turn==="X"?"O":"X";$("tttStatus").textContent=`${turn}'s turn`;}
$("tttReset")?.addEventListener("click",()=>{board=Array(9).fill("");turn="X";done=false;$("tttStatus").textContent="Your turn — X";drawTtt();});drawTtt();
// Rock Paper Scissors
document.querySelectorAll("[data-move]").forEach(b=>b.addEventListener("click",()=>{const you=b.dataset.move,opts=["rock","paper","scissors"],cpu=opts[Math.floor(Math.random()*3)];let result="Draw";if(you!==cpu&&((you==="rock"&&cpu==="scissors")||(you==="paper"&&cpu==="rock")||(you==="scissors"&&cpu==="paper")))result="You win";$("rpsResult").textContent=`You: ${you} · NEXPLAY: ${cpu} · ${result}`;if(result==="You win")saveScore("Rock Paper Scissors",5);}));
 // Memory Match
const symbols=["🎮","🚀","👾","⚡","🎯","💎","🔥","🛸"];let cards=[],first=null,lock=false,matches=0;
function setupMemory(){cards=[...symbols,...symbols].sort(()=>Math.random()-.5).map((s,i)=>({s,i,open:false,matched:false}));first=null;lock=false;matches=0;renderMemory();$("memoryStatus").textContent="Find all 8 pairs.";}
function renderMemory(){const el=$("memoryBoard");if(!el)return;el.innerHTML="";cards.forEach((c,i)=>{const b=document.createElement("button");b.className="memory-card";b.textContent=c.open||c.matched?c.s:"?";b.disabled=c.matched;b.addEventListener("click",()=>flip(i));el.append(b);});}
function flip(i){if(lock||cards[i].open||cards[i].matched)return;cards[i].open=true;renderMemory();if(first===null){first=i;return;}if(cards[first].s===cards[i].s){cards[first].matched=cards[i].matched=true;matches++;first=null;renderMemory();if(matches===8){$("memoryStatus").textContent="Perfect! All pairs matched.";saveScore("Memory Match",15);}}else{lock=true;setTimeout(()=>{cards[first].open=false;cards[i].open=false;first=null;lock=false;renderMemory();},750);}}
$("memoryReset")?.addEventListener("click",setupMemory);setupMemory();
// Click challenge
let clicks=0,active=false,timer=null;
$("startClick")?.addEventListener("click",()=>{if(active)return;clicks=0;active=true;$("clickCount").textContent="0";$("clickTimer").textContent="10 seconds remaining";$("clickTarget").disabled=false;$("startClick").disabled=true;let left=10;timer=setInterval(()=>{left--;$("clickTimer").textContent=`${left} seconds remaining`;if(left<=0){clearInterval(timer);active=false;$("clickTarget").disabled=true;$("startClick").disabled=false;$("clickTimer").textContent=`Time! You clicked ${clicks} times.`;saveScore("Click Challenge",clicks);}},1000);});
$("clickTarget")?.addEventListener("click",()=>{if(active){clicks++;$("clickCount").textContent=clicks;}});
