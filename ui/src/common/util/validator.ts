export const isValidEmail = (val: string) => {
  if (
    /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/.test(
      val
    )
  ) {
    return true
  }
  return false
}

export const isValidPassword = (val: string) => {
  const regex =
    /^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])|(?=.*[a-z])(?=.*[A-Z])(?=.*[!"#$%&'()*+\-.,/:;<=>?@[\\\]^_`{|}~])|(?=.*[A-Z])(?=.*[0-9])(?=.*[!"#$%&'()*+\-.,/:;<=>?@[\\\]^_`{|}~])|(?=.*[a-z])(?=.*[0-9])(?=.*[!"#$%&'()*+\-.,/:;<=>?@[\\\]^_`{|}~]))([a-zA-Z0-9!"#$%&'()*+\-.,/:;<=>?@[\\\]^_`{|}~]){8,}$/
  return regex.test(val)
}
