import User from "../../../database/models/user"

export default interface ISaveUserRepository {
  save (name: string, lastName:string, phoneNumber: string, email: string, password: string): Promise<User>
}