/* eslint-disable import/prefer-default-export */
import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions
} from 'firebase/firestore'
import { TemporarilyRegister, Users } from '../types/db'

/**
 * fireStoreでtemporarilyRegisterを追加する場合のコンバータ
 * fireStoreからの取得時にservertimestamp型をdateに変換する
 * @module addTemporarilyRegisterConverter
 */
export const temporarilyRegisterConverter: FirestoreDataConverter<TemporarilyRegister> =
  {
    toFirestore(temporarilyRegister): DocumentData {
      return temporarilyRegister
    },
    fromFirestore(
      snapshot: QueryDocumentSnapshot,
      options: SnapshotOptions
    ): TemporarilyRegister {
      const data = snapshot.data(options)
      return {
        email: data.email,
        isEnabled: data.isEnabled,
        expiredAt: data.expiredAt.toDate(),
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate()
      }
    }
  }
/**
 * fireStoreでusersを追加する場合のコンバータ
 * fireStoreからの取得時にservertimestamp型をdateに変換する
 * @module addTemporarilyRegisterConverter
 */
export const usersConverter: FirestoreDataConverter<Users> = {
  toFirestore(users): DocumentData {
    return users
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Users {
    const data = snapshot.data(options)
    return {
      uid: data.uid,
      displayName: data.displayName,
      email: data.email,
      photoURL: data.photoURL,
      lastLoginedAt: data.lastLoginedAt.toDate(),
      updatedAt: data.updatedAt.toDate(),
      createdAt: data.createdAt.toDate()
    }
  }
}
