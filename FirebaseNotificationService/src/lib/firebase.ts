import admin from 'firebase-admin';
import serviceAccount from '../../serviceAccountKey.json' with { type: 'json' };

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    databaseURL: 'https://sipalingiot-2c411-default-rtdb.firebaseio.com/',
  });
}

const db = admin.database();

export { admin, db };
