class VariableType {
  get (variable: any) {
    const result: any = Object.prototype.toString.call(variable).match(/\s([a-zA-Z]+)/)
    return result[1].toLowerCase()
  }
}

export default new VariableType()
