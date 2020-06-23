const admin = require("firebase-admin");

//init application
// reverts to default in .firebaserc as no app passed in to initializeApp()
admin.initializeApp({
  credential: admin.credential.cert(
    require("../../../../../Users/richard.graham/Documents/the-gear-report-a2ce8-firebase-adminsdk-es6st-e31cbaebe1.json")
  ),
  databaseURL: "https://the-gear-report-a2ce8.firebaseio.com",
});

const db = admin.firestore();

module.exports = { admin, db };
