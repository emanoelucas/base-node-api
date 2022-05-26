import MissingParamError from "../erros/missing-param-error"

export default (password: string, repeatPassword: string) => {

  if (!password)
    throw new MissingParamError('password')
  if (!repeatPassword)
    throw new MissingParamError('repeat password')

  return password === repeatPassword
}
