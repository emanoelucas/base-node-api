import User from "../../../database/models/user"

export default interface ILoadUserByIdRepository {
  load (id: string): Promise<User | null>
}