import admin from "firebase-admin";

import serviceAccount from "./firebase-admin-sdk-private-key.json";

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});
