import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {getAuth} from "firebase-admin/auth";

admin.initializeApp();

export const updateEmailVerified = functions
    .region("asia-northeast1")
    .firestore
    .document("users/{userId}")
    .onCreate(async (snap) => {
      const newValue = snap.data();
      if (newValue.isEmailUser !== true) {
        return;
      }
      if (newValue.uid === undefined) {
        throw new Error("updateEmailVerified userId is undefined");
      }
      await getAuth()
          .updateUser(newValue.uid, {
            emailVerified: true,
          });
    });

