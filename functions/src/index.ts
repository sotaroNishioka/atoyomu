import {initializeApp} from "firebase-admin/app";
import user from "./firebase/user";
import bookmark from "./firebase/bookmark";

initializeApp();

exports.foo = user.updateEmailVerified;
exports.bar = bookmark.getOGP;
