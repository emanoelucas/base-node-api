import { BadRequestError } from "../../../../src/utils/http/erros"
import { uuidv4Validator } from "../../../../src/utils/validators"

describe('uuid4 validator', () => {
  it('should throw if is not uuidv4', () => {
    const uuid = '1234567'
    expect(() => { uuidv4Validator.validate(uuid) }).toThrow(BadRequestError)
	})
  it('should proceed if it is a uuidv4', () => {
    const uuid = '60b7a0e2-71d3-461b-9253-d6f5a3aaa93b'
    expect(uuidv4Validator.validate(uuid)).toBeUndefined()
	})
})