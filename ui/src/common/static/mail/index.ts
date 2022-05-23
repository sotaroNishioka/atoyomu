/* eslint-disable import/prefer-default-export */
export const registerMail = (email: string, registerId: string) => `
${email}様
この度は「ATOYOMU」に仮登録いただき、ありがとうございます。
登録を続けるには、以下のリンクをクリックください。
（現段階では登録完了しておりません）

「ATOYOMU」本登録リンク
${process.env.NEXT_PUBLIC_HOST}/register?id=${registerId}


なお、何かご不明な点や、お困りのことがございましたら、 以下問い合わせ先よりご連絡ください。



-------------------------------------------------

※このメールはご入力のメールアドレスへシステムより自動送信しております。
こちらにご返信頂いた場合はご返答ができませんのでご了承ください。
※本メールは登録情報をお知らせするものです。
万一、このメールにお心当たりの無い場合は、以下の問合せ先までお知らせください。

＜問い合わせ＞
nishiokanandesuka@gmail.com

「ATOYOMU」
${process.env.NEXT_PUBLIC_HOST}

-------------------------------------------------
`
