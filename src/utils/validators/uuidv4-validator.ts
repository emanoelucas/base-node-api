import { BadRequestError } from "../http/erros"

class Uuidv4Validator {
  validate (uuid: string) {
    if ( !/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(uuid) )
      throw new BadRequestError('The given id value is not a uuidv4')
  }
}

export default new Uuidv4Validator()
