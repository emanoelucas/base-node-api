import User from "../../../database/models/user"

export default interface ILoadUserByEmailRepository {
  load (email: string): Promise<User | null>
}