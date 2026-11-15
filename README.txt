NEXPLAY — Online Gaming Website Starter
========================================

Technology: HTML, CSS, JavaScript modules, Firebase Authentication, Cloud Firestore.
Theme: Dark + Neon Blue/Purple.

IMPORTANT FIRST STEPS
1. Extract this ZIP.
2. Open the NEXPLAY folder in Visual Studio Code.
3. In Firebase Console, create a project and register a Web App.
4. Enable Authentication > Sign-in method > Email/Password.
5. Create a Cloud Firestore database.
6. Open js/firebase.js and replace the placeholder firebaseConfig values with your Firebase Web App config.
   Do not share private service-account keys or passwords.
7. Publish the rules in firestore.rules in Firestore > Rules.
8. Run with VS Code Live Server (or another local HTTP server). Do not open HTML files directly with file://.
9. Visit index.html through the local server, create an account, and test the games.

PAGES
index.html        Home page
login.html        Login
signup.html       Registration
dashboard.html    Player dashboard and recent scores
games.html        Tic Tac Toe, Rock Paper Scissors, Memory Match, Click Challenge
leaderboard.html  Top individual score submissions
tournament.html   Sample tournament preview (not live)
admin.html        Admin custom-claim access check

SECURITY AND PRODUCTION NOTES
- This is a starter/demo project, not a production-ready competitive gaming service.
- Browser-submitted scores can be manipulated. Before offering prizes, paid tournaments, or competitive rankings, validate game outcomes on a trusted backend/Cloud Functions.
- Admin custom claims must be assigned by a trusted server using Firebase Admin SDK. Never add an admin toggle to client-side JavaScript.
- Add privacy policy, terms, moderation, abuse protection, rate limits, backups, and monitoring before public launch.
- Firestore rules are a basic starting point; review them against your complete data model before deployment.

ZIP CONTENTS
See css/style.css, js/*.js, and firestore.rules for the implementation.
