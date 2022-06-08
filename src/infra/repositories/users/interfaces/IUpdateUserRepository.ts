import User from "../../../database/models/user";

export default interface IUpdateUserRepository {
  update (user: User, name: string, lastName:string, phoneNumber: string, email: string): Promise<User>
}