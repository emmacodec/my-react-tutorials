// Generating new private key from Admin SDK configuration snippet("firebase")  
import firebase from 'firebase-admin';

const config = {
    web_api_key: 'AlzaSyCxy4FCWKP4jrNE19bbN_KFq2mc3gH4-go'
}

var admin = require("firebase-admin");
var serviceAccount = require("path/to/serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});