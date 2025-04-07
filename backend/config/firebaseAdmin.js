const admin = require("firebase-admin");
const serviceAccount = require("../path-to-serviceAccountKey.json"); // Adjust path as needed

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;
