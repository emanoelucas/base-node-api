import variableType from "../../../../src/utils/commom/variable-type"

describe('Variable type', () => {
  it('should return string', () => {
    const variable = 'string'
    const varType = variableType.get(variable)
    expect(varType).toBe('string')
  })
  it('should return number', () => {
    const variable = 2
    const varType = variableType.get(variable)
    expect(varType).toBe('number')
  })
  it('should return array', () => {
    const variable: any[] = []
    const varType = variableType.get(variable)
    expect(varType).toBe('array')
  })
  it('should return object', () => {
    const variable = {
      a:1
    }
    const varType = variableType.get(variable)
    expect(varType).toBe('object')
  })
  it('should return null', () => {
    const variable = null
    const varType = variableType.get(variable)
    expect(varType).toBe('null')
  })
})