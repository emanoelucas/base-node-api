import bcrypt from 'bcrypt'

import MissingParamError from './../erros/missing-param-error'

const Salt = Number(process.env.ENCRYPTER_SALT)

class Encrypter {
  
  async hash (password: string) {
    if(!password) 
      throw new MissingParamError('password')
    return await bcrypt.hash(password, Salt)
  }

  async compare (password: string, passwordHash: string) {
    if(!password) 
      throw new MissingParamError('password')
    if(!passwordHash) 
      throw new MissingParamError('password hash')
    return await bcrypt.compare(password, passwordHash)
  }
}

export default new Encrypter()