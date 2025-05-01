var admin = require("firebase-admin");
const env = require('./config')
//var serviceAccount = require("../config/meli-extra-firebase-adminsdk-fbsvc-9707e325e8.json");
// Import the functions you need from the SDKs you need
const serviceAccount = {
  type: env.type,
  project_id: env.project_id,
  private_key_id: env.private_key_id,
  private_key: env.private_key,
  client_email: env.client_email,
  client_id: env.client_id,
  auth_uri: env.auth_uri,
  token_uri: env.token_uri,
  auth_provider_x509_cert_url: env.auth_provider_x509_cert_url,
  client_x509_cert_url: env.client_x509_cert_url,
  universe_domain: env.universe_domain,
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: env.DATABASE_URL,
});

const db = admin.database()

module.exports = db;

/* const users ={
  name: 'Sergio',
  pass: '123'
}

db.ref('users').push(users)

db.ref('users').once('value', (snapshot) => {
  const data = snapshot.val();
  console.log(data)
}) */