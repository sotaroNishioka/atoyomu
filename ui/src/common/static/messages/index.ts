/* eslint-disable import/prefer-default-export */
export const INVALID_TEMPORALY_REGISTER = {
  type: 'error',
  message:
    'ご登録いただいた内容が確認できませんでした。新規登録を再度行ってください。'
}

export const EXPIRED_TEMPORALY_REGISTER = {
  type: 'error',
  message: '仮登録の有効期限が切れています。新規登録を再度行ってください。'
}

export const EMAIL_ALREADY_IN_USE = {
  type: 'error',
  message:
    'このメールアドレスは既に登録されています。ログインを行うか、別のメールアドレスをお試しください。'
}

export const REGISTER_UNEXPECTED_ERROR = {
  type: 'error',
  message:
    'プロフィール登録に失敗しました。画面をリロードして再度お試しください。'
}

export const INVALID_LOGIN_DATA = {
  type: 'error',
  message: 'ログインに失敗しました。時間をおいて再度お試しください。'
}

export const RESET_PASSWORD_EMAIL_IS_NOT_EXSITS = {
  type: 'error',
  message: 'このメールアドレスは登録されていません。'
}

export const FAILED_RESET_PASSWORD = {
  type: 'error',
  message:
    'パスワードのリセットに失敗しました。時間をおいて再度お試しください。'
}

export const IS_NOT_NEW_USER = {
  type: 'error',
  message: 'このアカウントは既に登録されています。ログインを行ってください。'
}

export const SIGNUP_UNEXPEECTED_ERROR = {
  type: 'error',
  message: '新規登録に失敗しました。画面をリロードして再度お試しください。'
}

export const USER_IS_NOT_EXIST = {
  type: 'error',
  message: 'このアカウント登録されていません。新規登録を行ってください。'
}

export const RESET_PASSWORD_INVALID_URL = {
  type: 'error',
  message:
    'ご登録いただいた内容を確認できませんでした。画面をリロードして再度お試しください。'
}
export const UNEXPECTED_ERROR = {
  type: 'error',
  message: 'エラーが発生しました。画面をリロードして再度お試しください。'
}
