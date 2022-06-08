import User from "../../../database/models/user"

export default interface ISetUserParameterRepository {
  set (user: User, paramName: string, paramValue: any): Promise<User>
}